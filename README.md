# Inventory and Order Approval System

A full-stack Inventory and Order Approval Management application designed to streamline product management, order placement, and multi-level approval workflows.
The system supports Admin, Manager, and Sales Executive roles, each with specific responsibilities to maintain an efficient sales and inventory pipeline.

### Prerequisites
- Node.js 18+
- npm
- MongoDB (local or cloud)

### Docker Deployment (Recommended)

- git clone https://github.com/Soham1545/Inventory-and-Order-Approval-System.git
- cd "Inventory and Order Approval System"
- docker compose up --build

**Access URLs:**
- Frontend: http://localhost:3000
- Backend: http://localhost:5000

### Local Development

- git clone https://github.com/Soham1545/Inventory-and-Order-Approval-System.git
- cd "Inventory and Order Approval System"

# Frontend
- cd frontend
- npm install
- npm run dev

# Backend (separate terminal)
- cd backend
- npm install
- npm run dev

**Access URLs:**
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### First Time Login

Login as an admin using email as 
- user.admin@xoxomail.com
And password as
- Admin@1234

Login as a sales executive using email as 
- user.sales@xoxomail.com
And password as
- Sales@1234

Login as a manager using email as 
- user.manager@xoxomail.com
And password as
- Manager@1234

Once you login as an admin you can invite yourself.

### Core Features

- Role-based authentication & authorization
- Email invitation system
- Inventory management with SKU generation
- Order approval workflow
- Analytics dashboard
- Cart & order system

### Tech Stack

# Frontend

- React 19 (Vite)
- React Router DOM
- TailwindCSS v4
- Formik + Yup (Form validation)
- Axios
- Sonner (Toast notifications)
- Lucide React Icons

# Backend

- Node.js
- Express.js v5
- MongoDB + Mongoose
- JWT Authentication
- bcryptjs (Password hashing)
- Nodemailer (Email invitations)
- Cookie Parser & CORS

# Dev Tools

- ESLint
- Nodemon
- Vite

### Authentication & Security

- JWT-based authentication
- Role-based protected routes
- Secure password hashing

### User Roles & Permissions

## Dashboard Metrics(Common for all users)

- View pending approvals
- Approved orders
- Rejected orders
- Top performing products (Prices & total units sold)

# Admin

- View and invite users via email by assigning roles
- Invited users receive signup link to set name & password
- View inventory
- Add products (auto custom SKU generation)
- Edit product details
- Update quantity
- Delete products
- Access dashboard analytics

# Manager

- View pending orders
- Approve orders
- Reject orders with comments
- View approval history

# Sales Executive

- Browse products
- Add items to cart with quantity
- Place orders
- View own previous orders
