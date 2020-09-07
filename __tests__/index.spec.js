import request from "./helpers/request";

describe("Name of the group", () => {
  describe("GET /", () => {
    test("should respond with json data", () => {
      return request.get("/").then(res => {
        const {
          data: { message }
        } = res.body;
        expect(res.status).toEqual(200);
        expect(message).toEqual("Welcome to EDP endpoint");
      });
    });
  });
  describe("GET /****", () => {
    test("should respond with 404", () => {
      return request.get("/hello-world").then(res => {
        const {
          error: { message }
        } = res.body;
        expect(res.status).toEqual(404);
        expect(message).toEqual("API endpoint not found!");
      });
    });
  });
});
