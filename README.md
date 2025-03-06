# Shopping Cart Application

This is a shopping cart application built with Angular and .NET API . It allows users to view products, add them to a cart, and view the cart number of products dynamically. The cart's state is managed via a service and allows real-time updates.

## Features

- View a list of products
- Add products to the shopping cart


## Requirements

Before running the project, ensure you have the following tools installed:

### Frontend (Angular)

- **Node.js**: Version 14.x or higher
- **Angular CLI**: Version 12.x or higher

### Backend (.NET Core)

- **.NET 9** (for running the backend API)

## Setup Instructions

### 1. Clone the Repository

Start by cloning the project to your local machine using Git:

```bash
git clone https://github.com/yourusername/shopping-cart-app.git
```

### 2. Setup Backend (ASP.NET Core)

Navigate to the backend folder and restore dependencies:

```bash
cd shopping-cart-app/backend
dotnet restore
```


#### Running the .NET API

To start the API server, run the following command:

```bash
dotnet run
```

This will start the backend API on `http://localhost:5000` (or a similar port depending on your configuration).

**Note**: The backend exposes a `/products` endpoint to retrieve product data. Ensure the backend is running before starting the Angular frontend.

### 3. Setup Frontend (Angular)

Navigate to the frontend directory and install the necessary dependencies:

```bash
cd shopping-cart-app/frontend
npm install
```

This will install all the required packages for the Angular application to run.

#### Running the Angular Application

Once the dependencies are installed, you can run the Angular application:

```bash
ng serve
```


git clone https://github.com/yourusername/shopping-cart-app.git
