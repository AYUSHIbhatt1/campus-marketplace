let listing=require('../models/listing');
const authMiddleware = require('../middleware/authMiddleware');
const express=require('express');
const router = express.Router();
const multer = require('multer');
const ImageKitModule = require('@imagekit/nodejs');
const ImageKit = ImageKitModule.default || ImageKitModule;
const { toFile } = ImageKitModule;

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Please upload an image file.'));
        }
    }
});

const imagekit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});


router.post('/', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const {
            title,
            description,
            price,
            category,
            location,
            contactEmail
        } = req.body;

        let imageUrl = '';

        // Upload the image only if one was selected
        if (req.file) {
            const uploadedImage = await imagekit.files.upload({
                file: await toFile(
                    req.file.buffer,
                    req.file.originalname
                ),
                fileName: req.file.originalname
            });

            imageUrl = uploadedImage.url;
        }

        // Save listing details and image URL in MongoDB
        const post = await listing.create({
    title,
    description,
    price,
    category,
    location,
    contactEmail,
    imageUrl,
    owner: req.user.id
});

        res.status(201).json({
            message: 'Post created successfully',
            post
        });

    } catch (error) {
        console.error('Create listing error:', error);

        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            return res.status(400).json({
                message: 'Validation failed',
                errors: Object.values(error.errors).map(
                    (err) => err.message
                )
            });
        }

        // Handle invalid data types, such as a non-numeric price
        if (error.name === 'CastError') {
            return res.status(400).json({
                message: 'Invalid value provided',
                error: error.message
            });
        }

        // Handle unexpected errors
        return res.status(500).json({
            message: 'Internal server error',
            error: error.message
        });
    }
});
router.get('/',async(req,res)=>{
try{
let post=await listing.find();
res.status(200).json({message:"all post fetches successfully",post})
}
catch(error){
    res.status(500).json({error:error.message})
}


})


router.get('/:id', async (req, res) => {
    try {
        const post = await listing.findById(req.params.id);

        if (!post) {
            return res.status(404).json({
                message: 'Listing not found'
            });
        }

        res.status(200).json({
            message: 'Listing fetched successfully',
            post
        });
    } catch (error) {
        res.status(400).json({
            message: 'Invalid listing ID or request failed'
        });
    }
});


router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;

        const post = await listing.findById(id);

        if (!post) {
            return res.status(404).json({
                message: 'Post not found'
            });
        }

        if (post.owner.toString() !== req.user.id.toString()) {
            return res.status(403).json({
                message: 'You are not the owner of this listing. You are not allowed to delete it.'
            });
        }

        await listing.findByIdAndDelete(id);

        res.status(200).json({
            message: 'Post deleted successfully',
            post
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});


router.patch('/:id',authMiddleware, async (req, res) => {
    try {
        const id = req.params.id;

     const post = await listing.findOneAndUpdate(
    {
        _id: id,
        owner: req.user.id
    },
    {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        location: req.body.location,
        contactEmail: req.body.contactEmail
    },
    { new: true, runValidators: true }
);
        if (!post) {
            return res.status(404).json({
                message: 'you are not the owner of this Listing you are not allowed to edit'
            });
        }

        res.status(200).json({
            message: 'Post Updated successfully',
            post
        });
    }  catch (error) {
    if (error.name === 'CastError') {
        return res.status(400).json({
            message: 'Invalid listing ID'
        });
    }

    if (error.name === 'ValidationError') {
        return res.status(400).json({
            message: 'Validation failed',
            errors: Object.values(error.errors).map(err => err.message)
        });
    }

    res.status(500).json({
        message: 'Internal server error'
    });
}});

module.exports=router;