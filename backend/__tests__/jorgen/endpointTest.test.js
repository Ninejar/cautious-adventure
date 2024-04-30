import {jest} from "@jest/globals"
import request from 'supertest';
import { app } from '../../index.js';
import { User } from '../../models/userModel.js'; // Adjust the path as necessary

describe('GET /users/:id', () => {
  it('responds with JSON containing the specified user', async () => {
    // Define the ID of the user you want to retrieve
    const userId = '661e35ee2b842bb148ba3b93';

    // Create a mock user data
    const mockUser = {
      _id: userId,
      fName: 'John',
      lName: 'Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'student'
    };

    // Mock the implementation of User.findOne to return the mock user
    jest.spyOn(User, 'findOne').mockResolvedValue(mockUser);

    // Make the request to the endpoint
    const response = await request(app).get(`/users/${userId}`);

    // Check if the response status is 200 OK
    expect(response.status).toBe(200);

    // Check if the response body contains the specified user
    expect(response.body._id).toBe(userId);
    expect(response.body.fName).toBe(mockUser.fName);
    expect(response.body.lName).toBe(mockUser.lName);
    expect(response.body.email).toBe(mockUser.email);
    // Add more assertions for other user properties

    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });

  it('responds with a "user not found" message for an invalid user ID', async () => {
    // Mock the implementation of User.findOne to return null (user not found)
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
  
    // Make the request to the endpoint with an invalid user ID
    const invalidUserId = 'invalid_id';
    const response = await request(app).get(`/users/${invalidUserId}`);
  
    // Check if the response status is 404 Not Found
    expect(response.status).toBe(404);
  
    // Check if the response body contains the "user not found" message
    expect(response.body).toHaveProperty('message', 'User not found');
  
    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });
  

  // Add more test cases for handling errors, such as user not found, etc.
});

describe('GET /users', () => {
  it('responds with JSON containing all users', async () => {
    // Create mock users
    const mockUsers = [
      {
        _id: '661e35ee2b842bb148ba3b93',
        fName: 'John',
        lName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'student'
      },
      {
        _id: '761e35ee2b842bb148ba3b94',
        fName: 'Jane',
        lName: 'Doe',
        email: 'jane@example.com',
        password: 'password',
        role: 'student'
      }
      // Add more mock users as needed
    ];

    // Mock the implementation of User.find to return the mock users
    jest.spyOn(User, 'find').mockResolvedValue(mockUsers);

    // Make the request to the endpoint
    const response = await request(app).get('/users');

    // Check if the response status is 200 OK
    expect(response.status).toBe(200);

    // Check if the response body contains all mock users
    expect(response.body).toEqual(mockUsers);

    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });

  // Add more test cases for handling errors, etc.
});

describe('POST /users/signup', () => {
  it('responds with JSON containing the newly created user', async () => {
    // Define mock user data for signup
    const mockUserData = {
      fName: 'John',
      lName: 'Doe',
      email: 'john@example.com',
      password: 'password',
      role: 'student'
    };

    // Create a mock user object with an _id
    const mockUser = {
      _id: '661e35ee2b842bb148ba3b93',
      ...mockUserData
    };

    // Mock the implementation of User.findOne to return null (user does not exist)
    // Mock the implementation of User.save to return the mock user
    jest.spyOn(User, 'findOne').mockResolvedValue(null);
    jest.spyOn(User.prototype, 'save').mockResolvedValue(mockUser);

    // Make the request to the endpoint
    const response = await request(app)
      .post('/users/signup')
      .send(mockUserData);

    // Check if the response status is 200 OK
    expect(response.status).toBe(200);

    // Check if the response body contains the newly created user
    expect(response.body).toEqual(mockUser);

    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });

  it('responds with an error if an empty field is provided', async () => {
    // Define mock user data for signup with an empty field
    const mockUserData = {
      fName: 'Jane',
      lName: 'Doe',
      email: 'jane@example.com',
      password: 'password',
      role: undefined //this field is empty
    };

    // Make the request to the endpoint
    const response = await request(app)
      .post('/users/signup')
      .send(mockUserData);

    // Check if the response status is 400 Bad Request
    expect(response.status).toBe(400);

    // Check if the response body contains the error message
    expect(response.text).toContain('You must choose a role.');

    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });

  it('responds with an error if the email already exists', async () => {
    // Mock the implementation of User.findOne to return a user with the same email
    jest.spyOn(User, 'findOne').mockResolvedValue({ email: 'john@example.com' });
  
    // Make the request to the endpoint
    const response = await request(app)
      .post('/users/signup')
      .send({
        fName: 'John',
        lName: 'Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'student'
      });
  
    // Check if the response status is 400 Bad Request
    expect(response.status).toBe(400);
  
    // Check if the response body contains the error message
    expect(response.text).toContain('Email already exists');
  
    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });
  
});


describe('PUT /users/:id', () => {
  it('responds with JSON containing the updated user', async () => {
    // Define the ID of the user you want to update
    const userId = '661e35ee2b842bb148ba3b93';

    // Define the updated user data
    const updatedUserData = {
      fName: 'UpdatedFirstName',
      lName: 'UpdatedLastName',
      email: 'updatedemail@example.com',
      university: 'Updated University',
      department: 'Updated Department',
      role: 'teacher' // Update the role to 'teacher'
    };

    // Mock the implementation of User.updateOne to return a success message
    jest.spyOn(User, 'updateOne').mockResolvedValue({ message: 'User updated successfully' });

    // Make the request to the endpoint to update the user
    const response = await request(app)
      .put(`/users/${userId}`)
      .send(updatedUserData);

    // Check if the response status is 200 OK
    expect(response.status).toBe(200);

    // Check if the response body contains the success message
    expect(response.body.message).toBe('User updated successfully');

    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });
});


describe('DELETE /users/:id', () => {
  it('responds with JSON containing the success message for user deletion', async () => {
    // Define the ID of the user you want to delete
    const userId = '661e35ee2b842bb148ba3b93';

    // Mock the implementation of User.deleteOne to return a success message
    jest.spyOn(User, 'deleteOne').mockResolvedValue({ message: `User deleted with id ${userId}` });

    // Make the request to the endpoint to delete the user
    const response = await request(app).delete(`/users/${userId}`);

    // Check if the response status is 200 OK
    expect(response.status).toBe(200);

    // Check if the response body contains the success message
    expect(response.body.message).toBe(`user deleted with id ${userId}`);

    // Clean up: Reset the mock implementation
    jest.clearAllMocks();
  });

});


