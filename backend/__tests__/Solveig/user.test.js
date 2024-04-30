import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cors from 'cors';
import userRoutes from '../../routes/userRoutes';

let app;
let mongoServer;

beforeAll(async () => {
  // Set up an in-memory database for testing to avoid impacting the actual database
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  // Clean database to ensure no test data conflicts
  await mongoose.connection.dropDatabase();
  app = express(); // Initialize a new Express application
  app.use(express.json());
  app.use(cors());
  app.use('/users', userRoutes);
});

afterAll(async () => {
   // Clean up: disconnect from the in-memory database and stop the server after all tests
  await mongoose.disconnect();
  await mongoServer.stop();
});

// Test suite for user-related API endpoints
describe('User API endpoints - Solveig', () => {
  // Test to ensure that a new user can be signed up with valid data
    it('should sign up a new user with realistic data - solveig', async () => {
      const userData = {
        fName: 'John',
        lName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'student',
        date: new Date(),
      };
  
      // Send a POST request to the signup endpoint and check the response
      const response = await request(app)
        .post('/users/signup')
        .send(userData);
      expect(response.status).toBe(200); // Expect a successful response
      expect(response.body).toHaveProperty('_id'); // Expect the response to contain a user ID
    });
  
    it('should reject unusually formatted email addresses - solveig', async () => {
      const userData = {
        fName: 'Edge',
        lName: 'Case',
        email: 'not_an_email',
        password: 'password123',
        role: 'student',
        date: new Date()
      };
  
      const response = await request(app)
        .post('/users/signup')
        .send(userData);
      expect(response.status).toBe(400); // Expect a client error response
    });
  
    it('should reject requests with missing fields - solveig', async () => {
      const userData = {
        email: 'missing.fields@example.com',
        password: 'password123'
      };
  
       // Send a POST request missing some required fields
      const response = await request(app)
        .post('/users/signup')
        .send(userData);
      expect(response.status).toBe(400); // Expect a failure due to missing fields
    });
  });