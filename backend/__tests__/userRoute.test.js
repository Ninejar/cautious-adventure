import request from "supertest";
import { User } from "../models/userModel";
import app from '../index.js';

describe("User Controller Tests", () => {
  let testUser;

  describe("Realistic cases", () => {
    describe("When a user signs up", () => {
      it("should create a new user", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "John",
          lName: "Doe",
          email: "john.doe@example.com",
          password: "correctpw",
          role: "student",
          date: new Date(),
        });

        expect(response.statusCode).toBe(200);
        // Set testUser to the created user object
        testUser = response.body._id;
      });
    });

    describe("When a user logs in", () => {
      it("should login a user with correct credentials", async () => {
        const response = await request(app).post("/users/login").send({
          email: "john.doe@example.com",
          password: "correctpw",
        });
        expect(response.statusCode).toBe(200);
      });
    });
  });

  describe("Boundary cases", () => {
    describe("When a user signs up with first name longer than 50 characters", () => {
      it("should give error message longer than max allowed", async () => {
        const response = await request(app).post("/users/signup").send({
          fName:
            "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn",
          lName: "Doe",
          email: "toolongfirstname@mail.com",
          password: "correctpw",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain(
          "longer than the maximum allowed length (50)."
        );
      });
    });

    describe("When a user signs up with last name longer than 50 characters", () => {
      it("should give error message longer than max allowed", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "John",
          lName:
            "DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe",
          email: "toolonglastname@mail.com",
          password: "correctpw",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain(
          "longer than the maximum allowed length (50)."
        );
      });
    });

    describe("When a user signs up with email longer than 62 characters", () => {
      it("should give error message longer than max allowed", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "John",
          lName: "Doe",
          email:
            "toolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemail@mail.com",
          password: "correctpw",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain(
          "longer than the maximum allowed length (62)."
        );
      });
    });
  });

  describe("Edge cases", () => {
    describe("Delete testUser", () => {
      it("should delete the test user made in the test", async () => {
        expect(testUser).toBeTruthy();
        // Delete the user
        const response = await request(app).delete(`/users/${testUser}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe(`user deleted with id ${testUser}`);

        // Reset testUser after deletion
        testUser = null;
      });
    });
  });

  describe("Negative cases", () => {
    describe("When a user signs up with email in wrong format", () => {
      it("should return an error if email already exists", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "Test",
          lName: "User",
          email: "invalid@format",
          password: "password123",
          role: "student",
          date: new Date(),
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toContain(
          "email: Path `email` is invalid"
        );
      });
    });

    describe("When a user signs up with an existing email", () => {
      it("should return an error if email already exists", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "Test",
          lName: "User",
          email: "bbb@bbb.bbb", // Use existing email
          password: "password123",
          role: "student",
          date: new Date(),
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain("Email already exists");
      });
    });

    describe("When a user signs up, but did not fill out first name", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({
          lName: "Last name",
          email: "nofirstname@mail.com",
          password: "password",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Please enter your first name.");
      });
    });

    describe("When a user signs up, but did not fill out last name", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "First name",
          email: "nolastname@mail.com",
          password: "password",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Please enter your last name.");
      });
    });

    describe("When a user signs up, but did not fill out email", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "First name",
          lName: "Last name",
          password: "password",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Please enter your email.");
      });
    });

    describe("When a user signs up, but did not fill out password", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "First name",
          lName: "Last name",
          email: "nopassword@mail.com",
          role: "student",
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("Please choose a password");
      });
    });

    describe("When a user signs up, but did not choose arole", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({
          fName: "First name",
          lName: "Last name",
          email: "noroleselected@mail.mail",
          password: "password",
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toBe("You must choose a role.");
      });
    });

    describe("When a user logs in with invalid email", () => {
      it("should return an error for incorrect email", async () => {
        const response = await request(app).post("/users/login").send({
          email: "invalid@example.com", // Invalid email
          password: "password",
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain("Email could not be found");
      });
    });

    describe("When a user logs in with wrong password ", () => {
      it("should return an error for incorrect password", async () => {
        const response = await request(app).post("/users/login").send({
          email: "bbb@bbb.bbb",
          password: "wrongpw", // Invalid password
        });
        expect(response.statusCode).toBe(400);
        expect(response.text).toContain("Invalid password");
      });
    });
  });
});
