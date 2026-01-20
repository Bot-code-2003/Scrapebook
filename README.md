# DigiGift - Digital Gifting Platform

A modern digital gifting platform built with Next.js, MongoDB, and Tailwind CSS featuring a premium neo-brutalist design.

## 🎁 Features

- **Digital Gift Categories**: Courses, Subscriptions, Games, Gift Cards, Money & more
- **User Authentication**: Secure login/signup with JWT tokens
- **Neo-Brutalist Design**: Premium, bold, and memorable UI
- **Fully Responsive**: Works beautifully on all devices

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB (local or Atlas)

### Setup

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   Create a `.env.local` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/digigift
   JWT_SECRET=your-super-secret-jwt-key-here
   NODE_ENV=development
   ```

3. **Start MongoDB** (if using local):
   ```bash
   mongod
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS 4
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with HTTP-only cookies
- **Icons**: Lucide React

## 📁 Project Structure

```
digigift/
├── app/
│   ├── api/auth/      # Authentication API routes
│   ├── globals.css    # Global styles
│   ├── layout.js      # Root layout with providers
│   └── page.js        # Homepage
├── components/
│   ├── AuthModal.js   # Login/Signup modal
│   └── Header.js      # Navigation header
├── context/
│   └── AuthContext.js # Authentication context
├── lib/
│   ├── auth.js        # JWT utilities
│   ├── mongodb.js     # Database connection
│   └── models/
│       └── User.js    # User model
└── public/            # Static assets
```

## 🎨 Design System

The app uses a **Neo-Brutalist** design language:

- **Colors**: 
  - Primary: `#FF6B6B` (Coral Red)
  - Secondary: `#4ECDC4` (Teal)
  - Accent: `#FFE66D` (Yellow)
  - Background: `#FFFEF0` (Cream)
  
- **Typography**: Space Grotesk font family
- **Borders**: Bold 3-4px black borders
- **Shadows**: Offset box shadows for depth
- **Animations**: Subtle hover transitions

## 📝 License

MIT License - feel free to use for personal and commercial projects.
