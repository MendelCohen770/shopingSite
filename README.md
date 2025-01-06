# Shopping Site

The **Shopping Site** project is an e-commerce platform with user management capabilities. It includes an **Admin Panel** that allows administrators to add or remove products and view which users are currently online using **SignalR**.

## Key Features
- **Admin Panel:**
  - Add or delete products.
  - Monitor user activity (online/offline status) in real-time.
- **User Management System:**
  - Support for roles (Admin and regular users).
  - Secure user authentication using JWT and Bcrypt.
- **WebSocket Integration:**
  - Real-time communication using SignalR.

## Technologies Used
### Frontend
- **Framework:** Angular
- **Core Concepts:**
  - Services
  - Resolvers
  - Routing
  - Subscriptions
  - HTTP Requests

### Backend
- **Framework:** ASP.NET Core Web API
- **Core Concepts:**
  - LINQ
  - JWT Authentication
  - Authorization Attributes
  - SignalR for WebSocket communication

### Database
- **MySQL**

## Prerequisites
Before installing the project, ensure you have the following tools installed on your system:
- **Node.js**
- **.NET SDK**
- **MySQL**
- **Angular CLI**

## Installation
The project consists of two parts: the **Frontend** (client-side) and the **Backend** (server-side).

### Frontend Setup
1. Navigate to the client directory.
2. Run the following command to install dependencies:
   ```bash
   npm install
   ```
3. To start the frontend development server, run:
   ```bash
   ng serve
   ```

### Backend Setup
1. Open the server project in Visual Studio.
2. Build the project to install dependencies and prepare for execution.
3. Run the project from Visual Studio.

## Running the Project
1. Ensure both the **Frontend** and **Backend** are running.
   - Frontend: `ng serve`
   - Backend: Run the project in Visual Studio.
2. Open the frontend in your browser at `http://localhost:4200` (default Angular port).

## Admin User Creation
To create an Admin user:
- Use the following credentials during registration:
  - **Code:** `111`

## Creator
This project was developed by **Menahem Mendel Cohen**.

