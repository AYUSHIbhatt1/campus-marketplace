
const mongoose = require('mongoose');

const modelschema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters long'],
            maxlength: [100, 'Title cannot exceed 100 characters']
        },

        description: {
            type: String,
            required: [true, 'Description is required'],
            trim: true,
            minlength: [10, 'Description must be at least 10 characters long'],
            maxlength: [2000, 'Description cannot exceed 2000 characters']
        },

        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
            validate: {
                validator: Number.isFinite,
                message: 'Price must be a valid number'
            }
        },

        category: {
            type: String,
            required: [true, 'Category is required'],
            trim: true,
            enum: {
                values: [
                    'Books',
                    'Electronics',
                    'Furniture',
                    'Clothing',
                    'Stationery',
                    'Other'
                ],
                message: 'Please select a valid category'
            }
        },

        location: {
            type: String,
            trim: true,
            maxlength: [100, 'Location cannot exceed 100 characters'],
            default: ''
        },

        contactEmail: {
            type: String,
            required: [true, 'Contact email is required'],
            trim: true,
            lowercase: true,
            maxlength: [254, 'Email cannot exceed 254 characters'],
            match: [
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                'Please enter a valid email address'
            ]
        },

        imageUrl: {
            type: String,
            default: '',
            validate: {
                validator: function (value) {
                    if (!value) return true;

                    try {
                        const url = new URL(value);
                        return url.protocol === 'https:' || url.protocol === 'http:';
                    } catch {
                        return false;
                    }
                },
                message: 'Image URL must be a valid HTTP or HTTPS URL'
            }
        },
    
    owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
}
},
    { timestamps: true }
);

const Listing = mongoose.model('Listing', modelschema);

module.exports = Listing;
