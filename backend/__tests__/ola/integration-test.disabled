import app from "../../testing/testing-index-ola.js";
import request from "supertest";
import bcrypt from "bcryptjs";
import { Journal } from '../../models/journalModel.js'
import { User } from '../../models/userModel.js'

let testUserId;

// Create test user and find the _id to be used later before any tests are conducted
beforeAll(async () => {
    // Create user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("integration@testing.jest", salt);

    const testUser = new User({
        fName: "Test",
        lName: "User",
        email: "integration@testing.jest",
        password: hashedPassword,
        role: "student"
    });

    await testUser.save();


    // Find _id
    const response = await request(app)
        .get("/users")
    testUserId = response._body[0]._id;
});


describe("Ola - Integration tests - journals", () => {
    let token;

    // Get a JWT before running tests
    beforeAll(async () => {
        const payload = {
            email: "integration@testing.jest",
            password: "integration@testing.jest"
        };
        const response = await request(app)
            .post("/users/login")
            .send(payload);
        token = response.body.token;
    });

    describe("Get initial journals", () => {
        it("should return 200 and 0 or more journals", async () => {
            const response = await request(app)
                .get("/journals")
                .set("auth-token", token);
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeGreaterThanOrEqual(0);
        });
    });

    describe("Create journal", () => {
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Creation test",
                content: "Cool test, man",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
            // Title checked to confirm they're the same, the other properties in the payload object could also be checked
            expect(response.body.title).toBe(payload.title);
        });

        it("should return 200 and response length should now be at least 1", async () => {
            const response = await request(app)
                .get("/journals")
                .set("auth-token", token);
            expect(response.status).toBe(200);
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
        });
    });

    describe("Create journal - additional tests", () => {
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Test1",
                content: "There's not really a whole lot of interesting things I can do to test realistic use cases for journals, as you can put basically anything into them.",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Test2",
                content: "Maybe the negative cases will be a bit more interesting, since then I can try to break things :)",
                visibility: "Private"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Test3",
                content: "At this point I may as well just try random special characters (that *shouldn't* break things, just to be sure they don't.",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Test4",
                content: "XGT3213254135sdgstu'768799+0!#¤%&/()=?`´}][{€€$£@£@£*'^¨~",
                visibility: "Private"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Test5",
                content: "Surely that went well :).",
                visibility: "Private"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 201 and create a new journal", async () => {
            const payload = {
                title: "Test6",
                content: "Cool tests, for sure :)",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
    });

    describe("Delete (and get one) journal", () => {
        let randomJournal;
        it("should return 200 and the mongo id of a random journal", async () => {
            const response = await request(app)
                .get("/journals")
                .set("auth-token", token);
            const randomInt = Math.floor(Math.random()*response.body.data.length);
            randomJournal = response.body.data[randomInt]._id;
            expect(response.status).toBe(200);
        });

        it("should return 200 and delete the randomly selected journal", async () => {
            const response = await request(app)
                .delete(`/journals/${randomJournal}`)
                .set("auth-token", token);
            expect(response.status).toBe(200);
        });

        it("should return 404, as the journal was just deleted", async () => {
            const response = await request(app)
                .get(`/journals/${randomJournal}`)
                .set("auth-token", token);
            expect(response.status).toBe(404);
        });
    });

    describe("Boundary cases", () => {
        // maxLength
        it("should return 201 as the title field is one less than the maxLength property (64)", async () => {
            const payload = {
                title: "123456789011234567890212345678903123456789041234567890512345678",
                content: "Testing for negative cases",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 201 as the title field is exactly the same as maxLength", async () => {
            const payload = {
                title: "1234567890112345678902123456789031234567890412345678905123456789",
                content: "Testing for negative cases",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(201);
        });
        it("should return 500 as the title field is one more than maxLength", async () => {
            const payload = {
                title: "12345678901123456789021234567890312345678904123456789051234567890",
                content: "Testing for negative cases",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(500);
        });
    });

    describe("Negative cases", () => {
        // Missing required fields
        it("should return 400 due to missing title", async () => {
            const payload = {
                content: "Testing for negative cases",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(400);
        });
        it("should return 400 due to missing content", async () => {
            const payload = {
                title: "Negative case",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(400);
        });
        it("should return 400 due to missing visibility", async () => {
            const payload = {
                title: "Negative case",
                content: "Testing for negative cases"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(400);
        });

        // Incorrect enumerated type input
        it("should return 500 due to unacceptable value in enum", async () => {
            const payload = {
                title: "Negative case",
                content: "Testing for negative cases",
                visibility: "Illegal"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(500);
        });

        // Empty, but present fields
        it("should return 400 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                title: "",
                content: "Testing for negative cases",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(400);
        });
        it("should return 400 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                title: "Negative case",
                content: "",
                visibility: "Public"
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(400);
        });
        it("should return 400 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                title: "Negative case",
                content: "Testing for negative cases",
                visibility: ""
            };
            const response = await request(app)
                .post("/journals")
                .set("auth-token", token)
                .send(payload);
            expect(response.status).toBe(400);
        });
    });

    // Clear the journal collection after all the journal tests have been conducted
    afterAll(async () => {
        await Journal.deleteMany({});
    });
});

describe("Ola - Integration tests - users", () => {
    describe("Get initial users", () => {
        it("should return 200 and 1 user", async () => {
            const response = await request(app)
                .get("/users");
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(1);
        });
    });

    describe("Create user", () => {
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "Bobby",
                lName: "Tables",
                email: "bob@tab.byles",
                password: "lilbobbert",
                role: "student"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            // First name checked to confirm they're the same, the other properties in the payload object could also be checked
            expect(response.body.fName).toBe(payload.fName);
        });

        it("should return 200 and response length should now be 2", async () => {
            const response = await request(app)
                .get("/users");
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
        });
    });

    describe("Find one user", () => {
        it("should return 200 and confirm that the user's first and last name is what we expect", async () => {
            const response = await request(app)
                .get(`/users/${testUserId}`);
            expect(response.status).toBe(200);
            expect(`${response.body[0].fName} ${response.body[0].lName}`).toBe("Test User");
        });
    });

    describe("Create user - additional tests", () => {
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "John",
                lName: "Doe",
                email: "don@joe.he",
                password: "abcdefghijk",
                role: "teacher"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            expect(response.body.fName).toBe(payload.fName);
        });
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "Kevin",
                lName: "Punt",
                email: "terry@tange.la",
                password: "he'sinjailnow",
                role: "student"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            expect(response.body.lName).toBe(payload.lName);
        });
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "Matt",
                lName: "Parker",
                email: "number@nerd.uk",
                password: "0123456789",
                role: "student"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            expect(response.body.email).toBe(payload.email);
        });
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "Cool",
                lName: "Guy",
                email: "interesting@mail.man",
                password: "0123456789",
                role: "teacher"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            expect(response.body.role).toBe(payload.role);
        });
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "Skibidi",
                lName: "Skobidi",
                email: "skib@dibi.di",
                password: "0123456789",
                role: "teacher"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            expect(response.body.fName).toBe(payload.fName);
        });
        it("should return 200 and create a new user", async () => {
            const payload = {
                fName: "John",
                lName: "Hopkins",
                email: "john@hopkins.com",
                password: "0123456789",
                role: "teacher"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
            expect(response.body.lName).toBe(payload.lName);
        });
    });

    describe("Delete (and get one) user", () => {
        let randomUser;
        it("should return 200 and the mongo id of a random user", async () => {
            const response = await request(app)
                .get("/users");
            let randomInt;
            // Choose a random index for the response, not equal to 0 to avoid deleting the test user used for authentication
            do {
                randomInt = Math.floor(Math.random()*(response.body.length));
            } while (randomInt == 0);
            randomUser = response.body[randomInt]._id;
            expect(response.status).toBe(200);
        });

        it("should return 200 and delete the randomly selected user", async () => {
            const response = await request(app)
                .delete(`/users/${randomUser}`);
            expect(response.status).toBe(200);
        });

        // Unsure why it returns 200
        it("should return 200, and response body should be an empty array", async () => {
            const response = await request(app)
                .get(`/users/${randomUser}`);
            expect(response.status).toBe(200);
            expect(response.body).toHaveLength(0);
        });
    });

    describe("Boundary cases", () => {
        describe("first name max length", () => {
            it("should return 200 as the fName field is one less than the maxLength property (50)", async () => {
                const payload = {
                    fName: "1234567890112345678902123456789031234567890412345",
                    lName: "Test",
                    email: "fName@length.test1",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 200 as the fName field is exactly the same as maxLength", async () => {
                const payload = {
                    fName: "12345678901123456789021234567890312345678904123456",
                    lName: "Test",
                    email: "fName@length.test2",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 400 as the fName field is one more than maxLength", async () => {
                const payload = {
                    fName: "123456789011234567890212345678903123456789041234567",
                    lName: "Test",
                    email: "fName@length.test3",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(400);
            });
        });

        describe("last name max length", () => {
            it("should return 200 as the lName field is one less than the maxLength property (50)", async () => {
                const payload = {
                    fName: "Test",
                    lName: "1234567890112345678902123456789031234567890412345",
                    email: "lName@length.test1",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 200 as the lName field is exactly the same as maxLength", async () => {
                const payload = {
                    fName: "Test",
                    lName: "12345678901123456789021234567890312345678904123456",
                    email: "lName@length.test2",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 400 as the lName field is one more than maxLength", async () => {
                const payload = {
                    fName: "Test",
                    lName: "123456789011234567890212345678903123456789041234567",
                    email: "lName@length.test3",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(400);
            });
        });

        describe("email max length", () => {
            it("should return 200 as the email field is one less than the maxLength property (62)", async () => {
                const payload = {
                    fName: "Test",
                    lName: "Test",
                    email: "email@length1234567890112345678902123456789031234567890.test1",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 200 as the email field is exactly the same as maxLength", async () => {
                const payload = {
                    fName: "Test",
                    lName: "Test",
                    email: "email@length12345678901123456789021234567890312345678904.test2",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 400 as the email field is one more than maxLength", async () => {
                const payload = {
                    fName: "Test",
                    lName: "Test",
                    email: "email@length123456789011234567890212345678903123456789041.test3",
                    password: "lengthTest123",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(400);
            });
        });

        // They all return 200, likely because the "minLength" that is checked is the length after salting and hashing
        describe("password min length", () => {
            it("should return 200, even though the password field is one less than the minLength property (8)", async () => {
                const payload = {
                    fName: "Test",
                    lName: "Test",
                    email: "password@length.test1",
                    password: "1234567",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 200 as the password field is exactly the same as minLength", async () => {
                const payload = {
                    fName: "Test",
                    lName: "Test",
                    email: "password@length.test2",
                    password: "12345678",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
            it("should return 200 as the password field is one more than minLength", async () => {
                const payload = {
                    fName: "Test",
                    lName: "Test",
                    email: "password@length.test3",
                    password: "123456789",
                    role: "student"
                };
                const response = await request(app)
                    .post("/users/signup")
                    .send(payload);
                expect(response.status).toBe(200);
            });
        });
    });

    describe("Edge cases", () => {
        it("should return 200, even though the given password is far shorter than should be permitted (8 characters)", async () => {
            const payload = {
                fName: "Test",
                lName: "Test",
                email: "edge@case.test",
                password: "1",
                role: "student"
            };
            const response = await request(app)
                .post("/users/signup")
                .send(payload);
            expect(response.status).toBe(200);
        });
    });

    describe("Negative cases", () => {
        // Missing required fields
        it("should return 404 due to missing fName", async () => {
            const payload = {
                lName: "Test",
                email: "negative@missing.test1",
                password: "test123",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to missing lName", async () => {
            const payload = {
                fName: "Negative",
                email: "negative@missing.test2",
                password: "test123",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to missing email", async () => {
            const payload = {
                fName: "Negative",
                lName: "Test",
                password: "test123",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to missing password", async () => {
            const payload = {
                fName: "Negative",
                lName: "Test",
                email: "negative@missing.test4",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to missing role", async () => {
            const payload = {
                fName: "Negative",
                lName: "Test",
                email: "negative@missing.test5",
                password: "test123"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });

        // Incorrect enumerated type input
        it("should return 404 due to unacceptable value in enum", async () => {
            const payload = {
                fName: "Negative",
                lName: "Test",
                email: "negative@enum.test",
                password: "test123",
                role: "illegal"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });

        // Empty, but present fields
        it("should return 404 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                fName: "",
                lName: "Test",
                email: "negative@empty.test1",
                password: "test123",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                fName: "Negative",
                lName: "",
                email: "negative@empty.test2",
                password: "test123",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                fName: "Negative",
                lName: "Test",
                email: "",
                password: "test123",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
        it("should return 404 due to required fields not accepting 0-length strings", async () => {
            const payload = {
                fName: "Negative",
                lName: "Test",
                email: "negative@empty.test",
                password: "",
                role: "student"
            };
            const response = await request(app)
                .post("/users")
                .send(payload);
            expect(response.status).toBe(404);
        });
    });
});


// Clear the user collection after all tests have been conducted
afterAll(async () => {
    await User.deleteMany({});
});
