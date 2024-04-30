import request from 'supertest';
import express from 'express';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import cors from 'cors';
import userRoutes from '../../routes/userRoutes';

let app;
let mongoServer;

beforeAll(async () => {
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
  app = express();
  app.use(express.json());
  app.use(cors());
  app.use('/users', userRoutes);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('User API endpoints - Solveig', () => {
    it('should sign up a new user with realistic data - solveig', async () => {
      const userData = {
        fName: 'John',
        lName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        role: 'student',
        date: new Date(),
      };
  
      const response = await request(app)
        .post('/users/signup')
        .send(userData);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('_id');
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
      expect(response.status).toBe(400);
    });
  
    it('should reject requests with missing fields - solveig', async () => {
      const userData = {
        email: 'missing.fields@example.com',
        password: 'password123'
      };
  
      const response = await request(app)
        .post('/users/signup')
        .send(userData);
      expect(response.status).toBe(400);
    });
  });