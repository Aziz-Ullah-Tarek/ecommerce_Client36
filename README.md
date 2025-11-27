# ShopHub - E-Commerce Platform

A modern full-stack e-commerce application built with Next.js, featuring NextAuth.js authentication with Google OAuth, product management, and a responsive user interface.

## 🚀 Live Demo

- **Frontend:** https://shophub36.vercel.app
- **Backend API:** https://shophub-one-rosy.vercel.app/api

## 📋 Features

- 🔐 Authentication with NextAuth.js (Google OAuth & Email/Password)
- 🛍️ Browse and view product details
- ➕ Add, edit, and manage products (protected routes)
- 📱 Fully responsive design
- 🎨 Modern UI with Tailwind CSS
- 🔒 Protected routes for authenticated users
- 🌐 RESTful API integration

## 🛠️ Setup & Installation

### Prerequisites

- Node.js 18.x or higher
- npm or yarn
- MongoDB Atlas account (for backend)
- Google OAuth credentials (for authentication)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/Aziz-Ullah-Tarek/Ecommerce_Client.git
   cd Ecommerce_Client/frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env.local` file in the frontend directory:
   ```env
   NEXT_PUBLIC_API_URL=https://shophub-one-rosy.vercel.app/api
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret_here
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗺️ Route Summary

### Public Routes
- `/` - Landing page with featured products and sections
- `/login` - User login (Email/Password or Google OAuth)
- `/register` - User registration
- `/products` - Browse all products
- `/products/[id]` - View individual product details

### Protected Routes (Authentication Required)
- `/add-product` - Add new products
- `/manage-products` - View and manage all products
- `/edit-product/[id]` - Edit existing products

### API Routes
- `/api/auth/[...nextauth]` - NextAuth.js authentication endpoints

## 🔧 Technologies Used

- **Framework:** Next.js 16.0.4 (App Router)
- **UI:** React 19.2.0, Tailwind CSS
- **Authentication:** NextAuth.js v4.24.13
- **HTTP Client:** Axios
- **Backend:** Express.js, MongoDB
- **Deployment:** Vercel

## 📦 Project Structure

```
frontend/
├── app/
│   ├── (auth)/          # Authentication pages
│   │   ├── login/
│   │   └── register/
│   ├── (protected)/     # Protected pages
│   │   ├── add-product/
│   │   ├── edit-product/
│   │   └── manage-products/
│   ├── products/        # Product pages
│   ├── api/             # API routes
│   ├── layout.jsx       # Root layout
│   └── page.jsx         # Landing page
├── components/          # Reusable components
├── lib/                 # Utility functions
└── public/              # Static assets
```

## 🔑 Authentication Flow

1. **Email/Password:** Users can register and login with credentials
2. **Google OAuth:** One-click login with Google account
3. **Session Management:** JWT-based sessions with NextAuth.js
4. **Protected Routes:** Automatic redirection to login for unauthenticated users

## 🚀 Deployment

This project is deployed on Vercel:

```bash
# Deploy to production
vercel --prod
```

## 📝 Environment Variables

Required environment variables for production:

- `NEXT_PUBLIC_API_URL` - Backend API URL
- `NEXTAUTH_URL` - Frontend URL
- `NEXTAUTH_SECRET` - Secret for NextAuth.js encryption
- `GOOGLE_CLIENT_ID` - Google OAuth Client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth Client Secret

## 👤 Author

**Aziz Ullah Tarek**
- GitHub: [@Aziz-Ullah-Tarek](https://github.com/Aziz-Ullah-Tarek)
- Email: azizullaht2002@gmail.com

## 📄 License

This project is open source and available under the MIT License.
