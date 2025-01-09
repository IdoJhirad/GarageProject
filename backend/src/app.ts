import dotenv from "dotenv";
import cors from "cors"
import express, { Express} from "express";
import cookieParser from "cookie-parser";
import v1Router from './routes/v1Routers/v1Routes'
// Load environment variables
dotenv.config();

const app:Express = express();


//add Middleware
/**
 * specifies the allowed origins the domains from which requests are allowed.
 *  allows the server to accept cookies and other credentials
 *  exposedHeaders:  Specifies the headers that can be exposed to the browser in the response
 *  methods:  Defines the HTTP methods that are allowed for cross-origin requests. */
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    exposedHeaders: ['X-Total-Count'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));
// Parses incoming JSON request bodies
app.use(express.json());
// Parses cookies and makes them accessible via req.cookies
app.use(cookieParser());

app.use("/api/v1", v1Router );

export default app;

