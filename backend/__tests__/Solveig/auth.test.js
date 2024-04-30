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
            const user = { id: 1, name: 'Test User' };
            const token = jwt.sign(user, process.env.TOKEN_SECRET);
            const req = createRequest({
                headers: {
                    'auth-token': token
                }
            });
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next);
            expect(req.user).toBeDefined();
            expect(req.user.id).toBe(user.id);
            expect(next).toBeCalled();
        });
    });

    // Boundary Cases
    describe("Token expiration - solveig", () => {
        it("blocks access when token expires - solveig", () => {
            const user = { id: 1, name: 'Test User' };
            const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '0s' });
            const req = createRequest({
                headers: {
                    'auth-token': token
                }
            });
            const res = createResponse();
            const next = jest.fn();

            auth(req, res, next);
            expect(res.statusCode).toBe(400);
            expect(next).not.toBeCalled();
        });
    });

    describe("Large Token Handling - solveig", () => {
        it("handle very long tokens - solveig", () => {
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

    // Negative Cases
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

            auth(req, res, next);
            expect(res.statusCode).toBe(400);
            expect(next).not.toBeCalled();
        });
    });
});