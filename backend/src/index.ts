

import app from "./app"; 
import connectToDb from "./db/db"; // Import the DB connection function
import dotenv from "dotenv";
import mongoose, { Schema, Document, Model, Types } from 'mongoose';

//importe here for registration in db fix  MissingSchemaError: Schema hasn't been registered for model "Garage".
import './db/garage.model'
import './db/user.model'

// Load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

//connect to the database
connectToDb();

// Attach event listeners to the database connection
mongoose.connection.on("connected", () => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
});

mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
});