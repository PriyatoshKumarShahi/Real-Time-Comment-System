# Real-Time-Comment-System

This is a simple real-time comments system built with **Next.js** for the front-end, **Node.js** for the back-end, and **MySQL** for the database. It allows users to log in with a username, post comments, and see new comments appear in real-time using **Socket.IO**.

---

## Features:
- **Login**: Users can log in using a simple username (no password required).
- **Post Comments**: Users can post comments that will be saved in a MySQL database.
- **Real-Time Comments**: Comments are automatically updated in real-time across all connected clients using Socket.IO.
- **Responsive UI**: The app is styled using Material UI (MUI) and is mobile-friendly.

---

## Table of Contents
- [Requirements](#requirements)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Database Setup](#database-setup)
- [Real-Time Feature (Socket.IO)](#real-time-feature-socketio)
- [License](#license)

---

## Requirements

Before running the application, make sure you have the following installed on your machine:
- **Node.js** (version 14 or higher)
- **npm** (Node Package Manager)
- **MySQL** (or MariaDB)

You will also need the following dependencies:
- **Next.js**
- **Material UI (MUI)**
- **Axios**
- **Socket.IO (for real-time functionality)**
- **MySQL2** (for connecting Node.js to MySQL)

---

## Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository

git clone https://github.com/PriyatoshKumarShahi/Comments_System.git
cd Comment-System-main

### 2. Install Dependencies for client site
cd comment-system
npm install

### 3. Install Dependencies for server 
cd server
npm install

### 4.Set up the database: Create a MySQL database and configure the connection settings in your server code.


### 5. Start the backend server
node index.js

### 6. Start the client
cd ..
npm run dev






