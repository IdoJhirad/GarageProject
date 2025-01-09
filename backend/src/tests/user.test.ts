/**
 * Test for user controller
 * Setup: connection to the MongoDB, register a user, log in, and save the cookie.
 * Test garages are preloaded into the database for validating garage-related endpoints.
 * After the test, User and Garage collections are cleared, and the connection is closed.
 */
import request from "supertest";
import app from "../app";
import mongoose from "mongoose";
import User from "../db/user.model";
import Garage from "../db/garage.model";

jest.setTimeout(30000); // Set timeout to 30 seconds

describe("User Controller Tests", () => {
    let token: string;

    const testGarages = [
        {
            _id: 1, // Use integers for `_id`
            mispar_mosah: 123,
            shem_mosah: "Test Garage 1",
            cod_sug_mosah: 1,
            sug_mosah: "Type 1",
            ktovet: "Address 1",
            yishuv: "City 1",
            telephone: "123456789",
            mikud: 12345,
            miktzoa: "Specialization 1",
            menahel_miktzoa: "Manager 1",
            rasham_havarot: 123,
        },
        {
            _id: 2, // Use integers for `_id`
            mispar_mosah: 456,
            shem_mosah: "Test Garage 2",
            cod_sug_mosah: 2,
            sug_mosah: "Type 2",
            ktovet: "Address 2",
            yishuv: "City 2",
            telephone: "987654321",
            mikud: 54321,
            miktzoa: "Specialization 2",
            menahel_miktzoa: "Manager 2",
            rasham_havarot: 456,
        },
    ];

    beforeAll(async () => {
        // Connect to the database
        await mongoose.connect(process.env.MONGO_URI!);

        // Clear the collections
        await User.deleteMany({});
        await Garage.deleteMany({});

        // Register a user
        const registerResponse = await request(app)
            .post("/api/v1/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "securepassword",
            });

        expect(registerResponse.status).toBe(201);

        // Log in to get the token
        const loginResponse = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "test@example.com",
                password: "securepassword",
            });
        expect(loginResponse.status).toBe(200);
        token = loginResponse.headers["set-cookie"][0]?.split(";")[0]?.split("=")[1];

        // Insert garages into the database
        for (const garage of testGarages) {
            await Garage.create(garage);
        }
    });

    afterAll(async () => {
        // Clear the collections
        await User.deleteMany({});
        await Garage.deleteMany({});
        await mongoose.connection.close();
    });

    describe("GET /api/v1/user/info", () => {
        it("should return user info successfully", async () => {
            const response = await request(app)
                .get("/api/v1/user/info")
                .set("Cookie", `token=${token}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("name", "Test User");
            expect(response.body).toHaveProperty("email", "test@example.com");
        });

        it("should return 401 for an invalid token", async () => {
            const response = await request(app)
                .get("/api/v1/user/info")
                .set("Cookie", `token=invalidtoken`);
            expect(response.status).toBe(401);
            expect(response.body).toHaveProperty("message", "Invalid Token, please login again");
        });
    });

    describe("GET /api/v1/user/garages", () => {
        it("should return saved garages successfully", async () => {
            // Save garages to the user's savedGarages first
            const saveResponse = await request(app)
                .post("/api/v1/user/garages")
                .set("Cookie", `token=${token}`)
                .send({ garages: testGarages });
            expect(saveResponse.status).toBe(200);

            // Fetch saved garages
            const response = await request(app)
                .get("/api/v1/user/garages")
                .set("Cookie", `token=${token}`);
            expect(response.status).toBe(201);
            expect(response.body).toHaveProperty("savedGarages");
            expect(response.body.savedGarages).toHaveLength(testGarages.length);
        });
    });

    describe("POST /api/v1/user/garages", () => {
        it("should save new garages successfully", async () => {
            const newGarages = [
                {
                    _id: 3, // Use integer `_id`
                    mispar_mosah: 789,
                    shem_mosah: "New Garage",
                    cod_sug_mosah: 3,
                    sug_mosah: "Type 3",
                    ktovet: "New Address",
                    yishuv: "New City",
                    telephone: "123123123",
                    mikud: 67890,
                    miktzoa: "New Specialization",
                    menahel_miktzoa: "New Manager",
                    rasham_havarot: 789,
                },
            ];
            const response = await request(app)
                .post("/api/v1/user/garages")
                .set("Cookie", `token=${token}`)
                .send({ garages: newGarages });
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty("message", "Garages saved successfully");
        });

        it("should return 400 for invalid `mispar_mosah`", async () => {
            const invalidGarages = [
                {
                    _id: 4,
                    mispar_mosah: "invalid123", //invalid
                    shem_mosah: "Invalid Garage",
                    cod_sug_mosah: 4,
                    sug_mosah: "Type 4",
                    ktovet: "Invalid Address",
                    yishuv: "Invalid City",
                    telephone: "111111111",
                    mikud: 11111,
                    miktzoa: "Invalid Specialization",
                    menahel_miktzoa: "Invalid Manager",
                    rasham_havarot: 111,
                },
            ];
            const response = await request(app)
                .post("/api/v1/user/garages")
                .set("Cookie", `token=${token}`)
                .send({ garages: invalidGarages });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message","Invalid data: \"mispar_mosah\"");
        });

        it("should return 400 for invalid garages data (empty array)", async () => {
            const response = await request(app)
                .post("/api/v1/user/garages")
                .set("Cookie", `token=${token}`)
                .send({ garages: [] });
            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty("message", "Invalid garages data");
        });
    });
});
