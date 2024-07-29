import request from "supertest";
import server from "../../server";

let token: string;

beforeEach(() => {
  process.env.USER_COUNT = "0";
});
afterEach(() => {
  process.env.USER_COUNT = "0";
});
afterAll(() => {
  server.close();
});
describe("User API'S", () => {
  describe("POST /api/v1/users/register", () => {
    it("Should Register New User", async () => {
      const newUser = {
        name: "Taru", //unique
        email: "taru.sharma@gamemano.in", //unique
        password: "771771",
        confirmPassword: "771771",
      };

      const response = await request(server)
        .post("/api/v1/users/register")
        .send(newUser)
        .set("Accept", "application/json");

      expect(response.status).toBe(201);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User Registered!");
    });

    it("Should Return Error if Password Confirm Password Mismatch", async () => {
      const newUser = {
        name: "Taru", //unique
        email: "taru.sharma@gamemano.in", //unique
        password: "771771",
        confirmPassword: "77177",
      };

      const response = await request(server)
        .post("/api/v1/users/register")
        .send(newUser)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Password-Confirm Password Mismatch");
    });

    it("Should Return Error if Password Confirm Password Mismatch", async () => {
      const newUser = {
        name: "Taru", //unique
        email: "taru.sharma@gamemano.in", //unique
        password: "771771",
        confirmPassword: "77177",
      };

      const response = await request(server)
        .post("/api/v1/users/register")
        .send(newUser)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Password-Confirm Password Mismatch");
    });

    it("Return Error,If Not Send Any Of The Required Field", async () => {
      const newUser = {
        name: "Taru", //unique
        email: "taru.sharma@gamemano.in", //unique
        password: "771771",
      };

      const response = await request(server)
        .post("/api/v1/users/register")
        .send(newUser)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Errors");
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toBe("Field confirmPassword is required");
    });
  });

  describe("POST /api/v1/users/logIn", () => {
    it("Should Return Token", async () => {
      const requestBody = {
        email: "tarun.sharma@gamemano.in", //unique
        password: "pas@123",
      };
      process.env.USER_COUNT = "1";
      const response = await request(server)
        .post("/api/v1/users/login")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Logged In!");
      expect(response.body.data).toHaveProperty("token");
      expect(response.body.data.token).not.toBeNull();
      token = response.body.data.token;
    });

    it("Return Error If Try To Login With Email Not Exist In DB", async () => {
      const requestBody = {
        email: "ta.sharma@gamemano.in", //unique
        password: "pas@123",
      };
      process.env.USER_COUNT = "0";
      const response = await request(server)
        .post("/api/v1/users/login")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User Not Found");
    });

    it("Should Return Error if Try To Login With Wrong Password", async () => {
      const requestBody = {
        email: "tarun.sharma@gamemano.in", //unique
        password: "pas@12",
      };
      process.env.USER_COUNT = "1";
      const response = await request(server)
        .post("/api/v1/users/login")
        .send(requestBody)
        .set("Accept", "application/json");
      expect(response.status).toBe(401);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Invalid Credentials!");
    });

    it("Return Error,If Not Send Any Of The Required Field", async () => {
      const requestBody = {
        email: "tarun.sharma@gamemano.in",
      };
      process.env.USER_COUNT = "1";
      const response = await request(server)
        .post("/api/v1/users/login")
        .send(requestBody)
        .set("Accept", "application/json");

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Errors");
      expect(response.body).toHaveProperty("errors");
      expect(response.body.errors[0]).toBe("Field password is required");
    });
  });

  describe("POST /api/v1/users/getProfile", () => {
    it("Should Return Profile", async () => {
      process.env.USER_COUNT = "1";
      const response = await request(server)
        .get("/api/v1/users/getProfile")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User Profile");
      expect(response.body.data).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
        role: expect.any(String),
      });
    });
  });
});
