// auth.test.js
import { jest } from "@jest/globals";
import jwt from 'jsonwebtoken';
import auth from '../../verifyToken';

describe('Auth Middleware', () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      header: jest.fn()
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
    next = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Realistic Usage Cases', () => {
    it('should authenticate a user with a valid token', () => {
      req.header.mockReturnValue('valid_token');
      jest.spyOn(jwt, 'verify').mockReturnValue({ user: 'testUser' });

      auth(req, res, next);

      expect(req.user).toEqual({ user: 'testUser' });
      expect(next).toHaveBeenCalled();
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
  });

  describe('Boundary Cases', () => {
    it('should handle the case of token expiration within the acceptable threshold', () => {
      // Mock the token to expire in 10 seconds
      const expiringToken = jwt.sign({ user: 'testUser' }, 'secret', { expiresIn: 10 });

      req.header.mockReturnValue(expiringToken);
      jest.spyOn(jwt, 'verify').mockReturnValue({ user: 'testUser' });

      // Wait for token expiration threshold
      setTimeout(() => {
        auth(req, res, next);

        expect(req.user).toEqual({ user: 'testUser' });
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
      }, 9000); // Within the acceptable threshold (10 seconds)
    });

    it('should handle the case of token expiration right at the boundary', () => {
      // Mock the token to expire in 1 second
      const expiringToken = jwt.sign({ user: 'testUser' }, 'secret', { expiresIn: 1 });

      req.header.mockReturnValue(expiringToken);
      jest.spyOn(jwt, 'verify').mockReturnValue({ user: 'testUser' });

      // Wait for token expiration boundary
      setTimeout(() => {
        auth(req, res, next);

        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Access denied');
        expect(next).not.toHaveBeenCalled();
      }, 1000); // At the boundary of token expiration
    });
  });

  describe('Negative Cases', () => {
    it('should handle the case of no token provided', () => {
      req.header.mockReturnValue(undefined);

      auth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.send).toHaveBeenCalledWith('Access denied');
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle the case of an invalid token provided', () => {
      req.header.mockReturnValue('invalid_token');
      jest.spyOn(jwt, 'verify').mockImplementation(() => {
        throw new Error('Invalid token');
      });

      auth(req, res, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith('Invalid token');
      expect(next).not.toHaveBeenCalled();
    });

    it('should handle the case of an expired token provided', () => {
      // Mock the token to expire in the past
      const expiredToken = jwt.sign({ user: 'testUser' }, 'secret', { expiresIn: 1 }); // Token expires in 1 second
    
      // Ensure that the token is already expired by waiting for more than its expiration time
      setTimeout(() => {
        req.header.mockReturnValue(expiredToken);
        jest.spyOn(jwt, 'verify').mockImplementation(() => {
          throw new jwt.TokenExpiredError('jwt expired', new Date()); // Simulate token expiration error
        });
    
        auth(req, res, next);
    
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith('Access denied');
        expect(next).not.toHaveBeenCalled();
      }, 1000); // Wait for token expiration
    });
    
  });
});
