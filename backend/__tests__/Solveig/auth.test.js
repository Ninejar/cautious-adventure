import auth from '../../verifyToken';
import { createRequest, createResponse } from 'node-mocks-http';
import jwt from 'jsonwebtoken';
import {jest} from "@jest/globals"

import dotenv from 'dotenv'
dotenv.config()

describe('Solveig - Authentication', () => {
    // Realistic Usage Cases
    describe("User Authentication - solveig", () => {
        it("assigns user info from valid tokens to request - solveig", () => {
             // Create a test user and sign a JWT for them
            const user = { id: 1, name: 'Test User' };
            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            // Mock request and response objects, adding token to the request header
            const req = createRequest({
                headers: {
                    'auth-token': token
                }
            });
            const res = createResponse();
            const next = jest.fn(); // Mock next function to track its calls

            auth(req, res, next); // Apply auth middleware to the request
            // Check if user info is correctly assigned to the request object
            expect(req.user).toBeDefined();
            expect(req.user.id).toBe(user.id);
            expect(next).toBeCalled();
        });
    });

    // Testing group for boundary cases such as token expiration
    describe("Token expiration - solveig", () => {
        it("blocks access when token expires - solveig", () => {
            // Sign a token with immediate expiration
            const user = { id: 1, name: 'Test User' };
            const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '0s' });
            // Mock request and response, simulating an expired token
            const req = createRequest({
                headers: {
                    'auth-token': token
                }
            });
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next);
            // Check response status and ensure next is not called due to expired token
            expect(res.statusCode).toBe(400);
            expect(next).not.toBeCalled();
        });
    });

    // Testing group for handling very long tokens
    describe("Large Token Handling - solveig", () => {
        it("handle very long tokens - solveig", () => {
            // Create a test user and sign a JWT with a very long additional data
            const user = { id: 1, name: 'Test User' };
            const longData = new Array(10000).fill('a').join('');
            const token = jwt.sign({ ...user, longData }, process.env.TOKEN_SECRET);
            const req = createRequest({
                headers: {
                    'auth-token': token
                }
            });
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next);
            expect(req.user).toBeDefined();
            expect(next).toBeCalled();
        });
    });

    // Testing group for negative cases such as invalid or improperly formatted tokens
    describe("Invalid token responses - solveig", () => {
        it("denies access without a token - solveig", () => {
            const req = createRequest();
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next);
            expect(res.statusCode).toBe(401);
            expect(next).not.toBeCalled();
        });

        it("rejects invalid tokens - solveig", () => {
            const req = createRequest({
                headers: {
                    'auth-token': 'invalid-token'
                }
            });
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next);
            expect(res.statusCode).toBe(400);
            expect(next).not.toBeCalled();
        });

        it("blocks improper formatted tokens - solveig", () => {
            const req = createRequest({
                headers: {
                    'auth-token': 'malformed.token.here'
                }
            });
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next); // Test with malformed token
            expect(res.statusCode).toBe(400);
            expect(next).not.toBeCalled();
        });
    });
});