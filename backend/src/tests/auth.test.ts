import request from 'supertest';
import app from '../app'; // Adjust if needed to point to your Express app
import User from '../db/user.model';
import mongoose from "mongoose";


jest.setTimeout(20000);
beforeAll(async () => {
    // Example: Use your real DB connection string or a test DB
    await mongoose.connect(process.env.MONGO_URI!);
});

afterAll(async () => {
    // Close DB after all tests to avoid open handles
    await mongoose.connection.close();
});
describe('Auth API Tests', () => {
    beforeEach(async () => {
        // Clear the database before each 
        await User.deleteMany({});
    });

    describe('Register Endpoint', () => {
        it('should register a user successfully with valid inputs', async () => {
            const response = await request(app).post('/api/v1/auth/register').send({
                name: 'John Doe',
                email: 'john@example.com',
                password: 'securepassword',
            });

            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty('message', 'User registered successfully');
        });

        it('should fail registration when a required field is missing', async () => {
            const response = await request(app).post('/api/v1/auth/register').send({
                email: 'john@example.com',
                password: 'securepassword',
            });

            expect(response.status).toBe(400); 
            expect(response.body).toHaveProperty('message', 'Missing required field');
        });

        it('should fail registration with duplicate email', async () => {
            await request(app).post('/api/v1/auth/register').send({
                name: 'John Doe',
                email: 'duplicate@example.com',
                password: 'securepassword',
            });

            const response = await request(app).post('/api/v1/auth/register').send({
                name: 'Jane Doe',
                email: 'duplicate@example.com',
                password: 'securepassword',
            });

            expect(response.status).toBe(400); 
            expect(response.body).toHaveProperty('message', 'Email already exists');
        });
    });

    describe('Login Endpoint', () => {
        beforeEach(async () => {
          
            await request(app).post('/api/v1/auth/register').send({
                name: 'Jane Doe',
                email: 'jane@example.com',
                password: 'securepassword',
            });
        });
        

        it('should log in successfully with valid credentials', async () => {
            const response = await request(app).post('/api/v1/auth/login').send({
                email: 'jane@example.com',
                password: 'securepassword',
            });

            expect(response.status).toBe(200); // OK
            expect(response.body).toHaveProperty('message', 'Logged in successfully');
            expect(response.body).toHaveProperty('user');
            expect(response.body.user).toHaveProperty('email', 'jane@example.com');
            expect(response.headers['set-cookie']).toBeDefined(); // Cookie should be set
        });

        it('should fail login with invalid password', async () => {
            const response = await request(app).post('/api/v1/auth/login').send({
                email: 'jane@example.com',
                password: 'wrongpassword',
            });

            expect(response.status).toBe(401); // Unauthorized
            expect(response.body).toHaveProperty('message', 'Authentication failed');
        });

        it('should fail login for a non-existent user', async () => {
            const response = await request(app).post('/api/v1/auth/login').send({
                email: 'nonexistent@example.com',
                password: 'securepassword',
            });

            expect(response.status).toBe(404); // Not Found
            expect(response.body).toHaveProperty('message', 'User not found');
        });
    });
});
