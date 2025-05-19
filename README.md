# 📱 E-Commerce Mobile App

A complete mobile e-commerce application built using **React Native with Expo** and **Node.js**, offering a seamless shopping experience with user authentication, product browsing, and transaction processing.

---

## 🚀 Features

- ✅ User authentication (login/signup)  
- 🛍️ Product browsing with category filtering  
- 🔍 Product search functionality  
- 📄 Detailed product views  
- 🛒 Shopping cart management  
- 💳 Checkout process with location selection  
- 📜 Transaction history  

---

## 🛠️ Tech Stack

### Frontend

- React Native with Expo  
- Expo SDK for native functionality  
- React Navigation for routing  
- Axios for API requests  
- AsyncStorage for local data persistence  
- React Native Maps for location selection  
- Lottie for animations  

### Backend

- Node.js and Express  
- MongoDB with Mongoose  
- bcryptjs for password encryption  
- RESTful API architecture  

---

## 🧰 Getting Started

### 📦 Prerequisites

- Node.js    
- Expo CLI  

---


### 🔧 Installation

#### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ecommerce-app.git
cd ecommerce-app
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

#### 4. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

#### 5. Update API URL
In `frontend/src/api.js`, update the `BASE_URL` to match your backend server address.

---

## ▶️ Running the App

### 1. Start Backend Server
```bash
cd backend
npm start
```

### 2. Start Frontend Application
```bash
cd ../frontend
npx expo start
```

### 3. Run the App
- Open the **Expo Go** app on your mobile device.
- Scan the QR code displayed in your terminal or browser.

---

## 📡 API Endpoints

- **POST** `/api/users/signup` – User registration
- **POST** `/api/users/login` – User authentication
- **GET** `/api/products` – Product listing and details
- **GET** `/api/category` – Category management
- **POST** `/api/cart` – Cart and transaction processing

---

## 👨‍💻 Contributors

- Steven Bahaa
- Rehab Mohamed
- Ali Azouz


