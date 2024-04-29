// process.env.PORT = 1815;
import request from "supertest";
import app from '../../testing/testing-index-chris';

describe("Integration Tests: Journal endpoints", () => {
  let authToken;
  let journalIdMadeByTest;

  beforeAll(async () => {
    const response = await request(app).post("/users/login").send({
      email: "integration@testing.jest",
      password: "integration@testing.jest",
    });

    authToken = response.body.token;
  });

  describe("Realistic cases", () => {
    describe("When a user goes to /journals page", () => {
      it("should retrieve all journals created by the user", async () => {
        const response = await request(app)
          .get("/journals")
          .set("auth-token", authToken);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("count");
        expect(response.body.count).toBeGreaterThanOrEqual(3);
      });
    });

    describe("When a user creates a journal", () => {
      it("should create a new journal", async () => {
        const response = await request(app)
          .post("/journals")
          .send({
            title: "Create journal via integration testing",
            content: "Create journal via integration testing",
            visibility: "Public",
          })
          .set("auth-token", authToken);

        // Assertions
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("_id");
        expect(response.body.title).toBe(
          "Create journal via integration testing"
        );

        journalIdMadeByTest = response.body._id;
      });
    });

    describe("When a user deletes a journal", () => {
      it("should delete the journal (created by the test above)", async () => {
        const response = await request(app)
          .delete(`/journals/${journalIdMadeByTest}`)
          .set("auth-token", authToken);

        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Journal deleted successfully");
      });
    });
  });
  
  describe("Boundary cases", ()=>{
    describe("When a user creates a journal, but title is longer than 64 characters", () => {
      it("should show error", async () => {
        const response = await request(app)
          .post("/journals")
          .send({
            title: "Very long title no one likes long titles. Repeat. Very long title.",
            content: "Whoops forgot title...",
            visibility: "Public",
          })
          .set("auth-token", authToken);
          
          expect(response.statusCode).toBe(500)
          expect(response.body.message).toContain('is longer than the maximum allowed length (64)')
      });
    });
  })

  describe("Negative cases", () => {
    describe("When a user creates a journal, but did not fill out title", () => {
      it("should show error", async () => {
        const response = await request(app)
          .post("/journals")
          .send({
            content: "Whoops forgot title...",
            visibility: "Public",
          })
          .set("auth-token", authToken);
          
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain('Please choose a title.')
      });
    });

    describe("When a user creates a journal, but did not fill out content", () => {
      it("should show error", async () => {
        const response = await request(app)
          .post("/journals")
          .send({
            title: "Whoops forgot content...",
            visibility: "Public",
          })
          .set("auth-token", authToken);
          
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain('Please add content.')
      });
    });

    describe("When a user creates a journal, but did not select visibility", () => {
      it("should show error", async () => {
        const response = await request(app)
          .post("/journals")
          .send({
            title: "Whoops forgot visibility...",
            content: "choose visibility!!!",
          })
          .set("auth-token", authToken);
          
          expect(response.statusCode).toBe(400)
          expect(response.text).toContain('Please select visibility.')
      });
    });

  })
});
