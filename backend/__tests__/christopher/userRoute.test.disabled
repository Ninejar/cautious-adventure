import request from "supertest";
import app from '../../testing/testing-index-chris';

describe("Christopher - User Controller Tests", () => {
  let testUser;

  describe("Realistic cases", () => {
    describe("When a user signs up", () => {
      it("should create a new user", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "John",
          lName: "Doe",
          email: "john.doe@example.com",
          password: "correctpw",
          role: "student",
          date: new Date(),
        });

        // Assertion
        expect(response.statusCode).toBe(200); // Expect HTTP status code 200 for successful signup
        testUser = response.body._id; // Set testUser to the created user object for later use
      });
    });

    describe("When a user logs in", () => {
      it("should login a user with correct credentials", async () => {
        const response = await request(app).post("/users/login").send({ // Send a POST request to user login endpoint
          email: "john.doe@example.com",
          password: "correctpw",
        });
        // Assertion
        expect(response.statusCode).toBe(200); // Expect HTTP status code 200 for successful login
      });
    });
  });

  describe("Boundary cases", () => {
    describe("When a user signs up with first name longer than 50 characters", () => {
      it("should give error message longer than max allowed", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName:
            "JohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohnJohn",
          lName: "Doe",
          email: "toolongfirstname@mail.com",
          password: "correctpw",
          role: "student",
        });

        // Assertions
        expect(response.statusCode).toBe(400); // Expect error message to contain information about the length limit
        expect(response.body.message).toContain( // Expect error message to contain information about the length limit
          "longer than the maximum allowed length (50)."
        );
      });
    });

    describe("When a user signs up with last name longer than 50 characters", () => {
      it("should give error message longer than max allowed", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "John",
          lName:
            "DoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoeDoe",
          email: "toolonglastname@mail.com",
          password: "correctpw",
          role: "student",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.body.message).toContain( // Expect error message to contain information about the length limit
          "longer than the maximum allowed length (50)."
        );
      });
    });

    describe("When a user signs up with email longer than 62 characters", () => {
      it("should give error message longer than max allowed", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "John",
          lName: "Doe",
          email:
            "toolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemailtoolongemail@mail.com",
          password: "correctpw",
          role: "student",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.body.message).toContain( // Expect error message to contain information about the length limit
          "longer than the maximum allowed length (62)."
        );
      });
    });
  });

  describe("Edge cases", () => {
    describe("Delete testUser", () => {
      it("should delete the test user made in the test", async () => {
        expect(testUser).toBeTruthy(); // Expect testUser to exist
        const response = await request(app).delete(`/users/${testUser}`);  // DELETE request to user id endpoint

        expect(response.statusCode).toBe(200); // Expect HTTP status code 200 for successful user deletion
        expect(response.body.message).toBe(`user deleted with id ${testUser}`); // Expect response message confirming user deletion

       
        testUser = null;  // Reset testUser after deletion
      });
    });
  });

  describe("Negative cases", () => {
    describe("When a user signs up with email in wrong format", () => {
      it("should return an error if email already exists", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "Test",
          lName: "User",
          email: "invalid@format", // Invalid email format
          password: "password123",
          role: "student",
          date: new Date(),
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.body.message).toContain( // Expect error message to contain information about invalid email format
          "email: Path `email` is invalid"
        );
      });
    });

    describe("When a user signs up with an existing email", () => {
      it("should return an error if email already exists", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "Test",
          lName: "User",
          email: "bbb@bbb.bbb", // Use existing email
          password: "password123",
          role: "student",
          date: new Date(),
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toContain("Email already exists"); // Expect error message to contain information about email uniqueness
      });
    });

    describe("When a user signs up, but did not fill out first name", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          // First name field not filled
          lName: "Last name",
          email: "nofirstname@mail.com",
          password: "password",
          role: "student",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toBe("Please enter your first name.");
      });
    });

    describe("When a user signs up, but did not fill out last name", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "First name",
          // Last name field not filled
          email: "nolastname@mail.com",
          password: "password",
          role: "student",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toBe("Please enter your last name.");
      });
    });

    describe("When a user signs up, but did not fill out email", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "First name",
          lName: "Last name",
          // Email field not filled
          password: "password",
          role: "student",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toBe("Please enter your email.");
      });
    });

    describe("When a user signs up, but did not fill out password", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "First name",
          lName: "Last name",
          email: "nopassword@mail.com",
          // Password field not filled
          role: "student",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toBe("Please choose a password");
      });
    });

    describe("When a user signs up, but did not choose arole", () => {
      it("should return an error", async () => {
        const response = await request(app).post("/users/signup").send({ // Send a POST request to user signup endpoint
          fName: "First name",
          lName: "Last name",
          email: "noroleselected@mail.mail",
          password: "password",
          // Role not selected
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toBe("You must choose a role.");
      });
    });

    describe("When a user logs in with invalid email", () => {
      it("should return an error for incorrect email", async () => {
        const response = await request(app).post("/users/login").send({ // Send a POST request to user signup endpoint
          email: "invalid@example.com", // Invalid email
          password: "password",
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toContain("Email could not be found");
      });
    });

    describe("When a user logs in with wrong password ", () => {
      it("should return an error for incorrect password", async () => {
        const response = await request(app).post("/users/login").send({ // Send a POST request to user signup endpoint
          email: "bbb@bbb.bbb",
          password: "wrongpw", // Invalid password
        });
        expect(response.statusCode).toBe(400); // Expect HTTP status code 400 for a failed signup due to validation error
        expect(response.text).toContain("Invalid password");
      });
    });
  });
});
