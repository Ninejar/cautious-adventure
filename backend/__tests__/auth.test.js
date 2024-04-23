import { jest } from '@jest/globals';
import jwt from 'jsonwebtoken';
import authMiddleware from '../verifyToken';

// Mocking the request, response, and next function
const mockRequest = (token) => ({
    header: jest.fn().mockReturnValue(token ? token : undefined),
});


const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.send = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = jest.fn();

describe('Auth Middleware Unit Tests', () => {
    // Store the original process.env value to restore it after the test
    const OLD_ENV = process.env;

    beforeEach(() => {
        mockNext.mockClear(); 
        // Mock process.env.TOKEN_SECRET
        process.env.TOKEN_SECRET = 'superSecretToken';
    });

    afterEach(() => {
        // Restore process.env to its original state
        process.env = OLD_ENV;
    });

    it('should call next function if token is valid', () => {
        // Mock a valid token
        const token = jwt.sign({ userId: 'mockUserId' }, process.env.TOKEN_SECRET);
        const req = mockRequest(token);
        const res = mockResponse();

        authMiddleware(req, res, mockNext);

        expect(req.user).toBeDefined();
        expect(req.user.userId).toEqual('mockUserId');
        expect(mockNext).toHaveBeenCalled();
    });

    it('should return 401 if no token provided', () => {
        const req = mockRequest(null); // No token provided
        const res = mockResponse();

        authMiddleware(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Access denied');
        expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 if token is invalid', () => {
        // Mock an invalid token
        const req = mockRequest('invalid_token');
        const res = mockResponse();

        authMiddleware(req, res, mockNext);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.send).toHaveBeenCalledWith('Invalid token');
        expect(mockNext).not.toHaveBeenCalled();
    });
});
