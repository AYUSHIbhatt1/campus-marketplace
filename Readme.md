# Campus Marketplace 🛍️

A full-stack campus marketplace where students can list items for sale and browse listings posted by other users.

🌐 **Live Demo:** [Campus Marketplace](https://campus-marketplace-1-826i.onrender.com)

## ✨ Features

- **User Authentication** — Register and log in securely.
- **Create Listings** — Post items with a title, description, price, category, location, contact email, and image.
- **Browse Listings** — Explore items listed by other users.
- **Edit Listings** — Update your own listings.
- **Delete Listings** — Only the owner of a listing can delete it.
- **Image Uploads** — Upload listing images using ImageKit.
- **Database Storage** — Store user and listing data in MongoDB.
- **Protected Routes** — Authentication is required for restricted actions.
- **Responsive UI** — Browse the marketplace on different screen sizes.

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Axios

**Backend**
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- ImageKit

**Deployment**
- Render
- MongoDB Atlas

## 📁 Project Structure

```text
campus-marketplace/
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env
├── backend/
│   ├── src/
│   ├── routes/
│   ├── models/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js and npm
- MongoDB Atlas account
- ImageKit account

### 1. Clone the repository

```bash
git clone https://github.com/AYUSHIbhatt1/campus-marketplace.git
cd campus-marketplace
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and configure:

```env
DATABASE_URL=your_mongodb_connection_string
PORT=5000
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
node server.js
```

### 3. Set up the frontend

Open a separate terminal from the project root:

```bash
cd frontend
npm install
```

Create a `.env` file inside the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend development server:

```bash
npm run dev
```

Open the local URL displayed by Vite in your browser.

## 🔐 Environment Variables

Keep your environment variables and API secrets private. Never commit `.env` files to GitHub.

For production deployment, configure the environment variables in your hosting provider's dashboard.

## 🎯 Project Goal

Campus Marketplace was built to practise full-stack web development, including REST APIs, authentication, database operations, image uploads, ownership-based authorization, and deployment.

## 👩‍💻 Author

**Ayushi Bhatt**

- GitHub: [AYUSHIbhatt1](https://github.com/AYUSHIbhatt1)

---

⭐ If you find this project interesting, feel free to explore the repository!
