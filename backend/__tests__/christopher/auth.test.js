import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import authMiddleware from '../../verifyToken';

// Function to mock request object with token
const mockRequest = (token) => ({
    header: jest.fn().mockReturnValue(token ? token : undefined),
});

// Function to mock response object
const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Auth Middleware Unit Tests', () => {
    const OLD_ENV = process.env; // Storing the current environment variables

    beforeEach(() => {
        mockNext.mockClear();
        process.env.TOKEN_SECRET = 'superSecretToken'; // Setting a mock token secret in environment variable
    });

    afterEach(() => {
        process.env = OLD_ENV; // Restoring the environment variables
    });

    describe('Realistic Tests', () => {
        it('should call next function if token is valid', () => {
            const token = jwt.sign({ userId: 'mockUserId' }, process.env.TOKEN_SECRET);
            const req = mockRequest(token);
            const res = mockResponse();

            authMiddleware(req, res, mockNext);

            expect(req.user).toBeDefined();
            expect(req.user.userId).toEqual('mockUserId');
            expect(mockNext).toHaveBeenCalled();
        });
    });

    describe('Negative Tests', () => {
        it('should return 401 if no token provided', () => {
            const req = mockRequest(null);
            const res = mockResponse();

            authMiddleware(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(401);
            expect(res.send).toHaveBeenCalledWith('Access denied');
            expect(mockNext).not.toHaveBeenCalled();
        });

        it('should return 400 if token is invalid', () => {
            const req = mockRequest('invalid_token');
            const res = mockResponse();

            authMiddleware(req, res, mockNext);

            expect(res.status).toHaveBeenCalledWith(400);
            expect(res.send).toHaveBeenCalledWith('Invalid token');
            expect(mockNext).not.toHaveBeenCalled();
        });
    });
});