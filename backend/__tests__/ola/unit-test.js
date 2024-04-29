import auth from "../../verifyToken";
import {jest} from "@jest/globals"


describe("No authentification test", () => {
    it("should return 401 since no token is provided", () => {
        const req = { header: () => undefined };
        const next = jest.fn();

        const res = {
            status: jest.fn(() => res),
            send: jest.fn()
        };

        auth(req, res, next);

        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.send).toHaveBeenCalledWith("Access denied");
    });
});
