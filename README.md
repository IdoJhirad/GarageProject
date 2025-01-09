# Garage Project

## Project Overview
The Garage Project is a two-part application involving backend development with Node.js (TypeScript) and frontend development with Angular. The application interacts with a government API and an application database to manage garage data.

---

## Requirements

### Part 1: Backend Development (Node.js)
1. **Set Up:** Create a new Node.js project and install the required packages.
2. **Endpoints:**
    - **Fetch garage data from the government API:**
        - API URL: [Government Garage API](https://data.gov.il/api/3/action/datastore_search?resource_id=bb68386a-a331-4bbc-b668-bba2766d517d&limit=5)
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
**GET** `"/global-garages"`
- **Summary:** Get all garages.
- **Responses:**
   - `200`: List of all garages.


## Will be added in next update

#### **Logout**
**POST** `/auth/logout`
- **Summary:** User logout.
- **Responses:**
   - `200`: Logout successful.

---

#### **Change Password**
**POST** `/auth/change-password`
- **Summary:** Change user password.
- **Responses:**
   - `200`: Password changed successfully.
   - `400`: Invalid request.

---

#### **Reset Password**
**POST** `/auth/reset-password`
- **Summary:** Request password reset.
- **Responses:**
   - `200`: Reset email sent.
   - `400`: Invalid request.

---

#### **Reset Password Confirm**
**POST** `/auth/reset-password/confirm`
- **Summary:** Confirm password reset.
- **Responses:**
   - `200`: Password reset successfully.
   - `400`: Invalid request.

---

#### **Check Auth**
**GET** `/auth/check-auth`
- **Summary:** Check if user is authenticated.
- **Responses:**
   - `200`: Authenticated.
   - `401`: Not authenticated.

---
