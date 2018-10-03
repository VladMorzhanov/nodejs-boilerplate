const app = require("../src");
const should = require("should");
const { NODE_ENV } = require("../src/constants");

describe("App suite", () => {
  if (NODE_ENV !== "test") {
    throw new Error("This is production, no test available!");
  }

  it("app should exists", () => {
    should(app).be.ok();
  });
});
