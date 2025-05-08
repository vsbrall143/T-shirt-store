🛍️ E-Commerce Web Application
An end-to-end e-commerce platform built with React, Node.js, Express, and MongoDB. This application allows users to browse products, manage their shopping cart, and complete purchases using Razorpay integration.

🌐 Live Demo
View Live Application

📸 Screenshots




🚀 Features
User Authentication (Register/Login)

Product Browsing and Search

Shopping Cart Management

Size Selection for Products

Checkout with Razorpay Payment Gateway

Order Confirmation and History

Responsive Design for Mobile and Desktop

🛠️ Technologies Used
Frontend:

React

React Router

Context API with useReducer

Tailwind CSS

Backend:

Node.js

Express.js

MongoDB with Mongoose

JWT for Authentication

Razorpay API for Payments

🗂️ Project Structure
 
ecommerce-app/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   └── server.js
├── frontend/
│   ├── components/
│   ├── context/
│   ├── pages/
│   └── App.js
├── .env
├── package.json
└── README.md

⚙️ Installation
Prerequisites
Node.js and npm installed

MongoDB installed and running

Razorpay account for payment integration

Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app
Set up environment variables:

Create a .env file in the root directory and add the following:

env
Copy
Edit
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
Install dependencies:

bash
Copy
Edit
npm install
cd frontend
npm install
cd ..
Run the application:

bash
Copy
Edit
# In the root directory
npm run dev
The application will be available at http://localhost:3000.

🧪 Testing
To run tests, use the following command:

bash
Copy
Edit
npm test
Ensure that your test suites are properly configured in your project.

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙌 Acknowledgments
Razorpay for payment gateway integration

Tailwind CSS for utility-first CSS framework

MongoDB for the database solution
