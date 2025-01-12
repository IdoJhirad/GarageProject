# Garage Project

## Project Overview

The Garage Project is a two-part application involving backend development with Node.js (TypeScript) and frontend development with Angular. The application interacts with a government API and an application database to manage garage data.

---

## Requirements

### Part 1: Backend Development (Node.js)

1. **Set Up:** Create a new Node.js project and install the required packages.
2. **Endpoints:**
   - **Fetch garage data from the government API:**
     - API URL: [Government Garage API](https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d\&limit=5)
   - **Fetch garage data from the application database.**
   - **Save selected garages to the application database.**
3. **Database Operations:**
   - Ensure all operations with the database are asynchronous.
   - Use a database of your choice (e.g., MongoDB, PostgreSQL).

### Part 2: Frontend Development (Angular)

1. **Set Up:** Create a new Angular project and add Angular Material.
2. **Main Page:**
   - A table displaying all garages stored in the application database.
   - A multi-select component displaying garage data fetched from the government API (via the Node.js server).
   - An "Add" button.
3. **Angular Service:** Create a service for:
   - Fetching the list of garages via the Node.js API.
   - Adding new garages to the application database via the Node.js API.
4. **Page Behavior:**
   - On page load:
     - Fetch and display the list of garages from the application database in the table.
     - Populate the multi-select component with data fetched from the government API.
   - On clicking the "Add" button:
     - Retrieve selected garages from the multi-select component.
     - Add the selected garages to the database (with validation).
     - Update the table to include the newly added garages.

### Bonus:

- Add **Unit Tests** for the application.
- Implement an **authentication system** for both the server and the client.

---

## Technical Requirements

1. Use **TypeScript** for both backend and frontend development.
2. Handle basic errors appropriately.
3. Use **Angular Material** for UI components.
4. Use **Git** for version control.

---

# Garage Project API Documentation

## API Version: 1.0

### Description

API documentation for Garage Project v1.0

### Host

`localhost:3000`

### Base Path

`/api/v1`

### Schemes

- HTTP

---

## Paths

### **Authentication APIs**

#### **Register**

**POST** `/auth/register`

- **Summary:** Register a new user.
- **Responses:**
  - `201`: User registered successfully.
  - `400`: Invalid request.
    ```
    name:
    email:
    password:
    ```

---

#### **Login**

**POST** `/auth/login`

- **Summary:** User login.
- **Responses:**
  - `200`: Login successful.
  - `401`: Invalid credentials.
    ```
    name:
    email:
    ```

---

#### **Check Auth**

**GET** `/auth/check-auth`

- **Summary:** Check if user is authenticated.
- **Responses:**
  - `200`: Authenticated.
  - `401`: Not authenticated.

---

#### **Logout**

**POST** `/auth/logout`

- **Summary:** User logout.
- **Responses:**
  - `200`: Logout successful.

---

### **User APIs**

#### **Get User Info**

**GET** `/user/info`

- **Summary:** Get user information.
- **Responses:**
  - `200`: User information retrieved.
  - `401`: Unauthorized.

---

#### **Get User Garages**

**GET** `/user/garages`

- **Summary:** Get garages saved by user.
- **Responses:**
  - `200`: List of user's garages.
  - `401`: Unauthorized.
    ```
     _id:Types.ObjectId;
     mispar_mosah: number;
     shem_mosah: string;
     cod_sug_mosah: number;
     sug_mosah: string;
     ktovet: string;
     yishuv: string;
     telephone: string;
     mikud: number;
     miktzoa: string;
     menahel_miktzoa: string;
     rasham_havarot: number;
     TESTIME: string;
    ```

---

#### **Save Garage**

**POST** `/user/garages`

- **Summary:** Save a garage for the user.
- **Responses:**
  - `201`: Garage saved successfully.
  - `400`: Invalid request.
  ```
    _id:Types.ObjectId;
    mispar_mosah: number;
    shem_mosah: string;
    cod_sug_mosah: number;
    sug_mosah: string;
    ktovet: string;
    yishuv: string;
    telephone: string;
    mikud: number;
    miktzoa: string;
    menahel_miktzoa: string;
    rasham_havarot: number;
    TESTIME: string;
  ```

---

### **Global Garage APIs**

#### **Get All Garages**

**GET** `/global-garages`

- **Summary:** Retrieve a list of all garages with an optional limit on the number of results.

- **Query Parameters:**

  - **`limit`** (optional): The maximum number of garages to return.
    - **Type:** `integer`
    - **Default Value:** `20`
    - **Example Usage:** `GET /global-garages?limit=10`

- **Responses:**

  - `200`: List of garages limited by the specified number or all garages if no limit is provided.
    ```json
    [
        {
            "_id": "603e2c7e8d3f2a5a1b3a1c8e",
            "name": "Garage 1",
            "address": "123 Main Street",
            "city": "Sample City",
            "phone": "123-456-7890"
        },
        {
            "_id": "603e2c7e8d3f2a5a1b3a1c8f",
            "name": "Garage 2",
            "address": "456 Elm Street",
            "city": "Another City",
            "phone": "987-654-3210"
        }
    ]
    ```

---

## Steps to Run the Backend

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/IdoJhirad/GarageProject
   cd GarageProject/backend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**
   Create a `.env` file in the backend directory and add the following variables:

   ```env
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   PORT=3000
   ORIGIN="http://localhost:4200"
   # Token and cookie expiration settings
   LOGIN_TOKEN_EXPIRATION="1h"  # Days
   ```

4. **Run the Backend:**

   - For development:
     ```bash
     npm run dev
     ```
   - For production:
     ```bash
     npm start
     ```

5. **Run Tests:**

   ```bash
   npm run test
   ```

---

## Steps to Run the Frontend

1. **Navigate to the Frontend Directory:**

   ```bash
   cd GarageProject/frontend
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Run the Development Server:**

   ```bash
   ng serve
   ```

4. **Access the Application:**
   Open your browser and navigate to:

   ```
   http://localhost:4200
   ```


