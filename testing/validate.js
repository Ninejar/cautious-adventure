const { describe, it } = require("node:test");
const assert = require("node:assert");
const validator = require("./validate.js");

describe("validator for the link alive", () => {
    it("should return true for a valid URL", async () => {
        const result = await validator.checkLinkAlive("https://example.com");
        assert.strictEqual(result, true);
    });

    it("should return false for an invalid URL", async () => {
        const result = await validator.checkLinkAlive("not_a_valid_url");
        assert.strictEqual(result, false);
    });
});

describe("validator for the URL", () => {
    it("should return true for a valid URL", () => {
        const result = validator.validateURL("https://example.com");
        assert.strictEqual(result, true);
    });

    it("should return false for an invalid URL", () => {
        const result = validator.validateURL("not_a_valid_url");
        assert.strictEqual(result, false);
    });
});