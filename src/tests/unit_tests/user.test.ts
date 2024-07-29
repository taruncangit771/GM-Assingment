import { userLogIn, userProfile, userRegistration } from "../../services/user.service";

beforeEach(() => {
  process.env.USER_COUNT == "0";
});
afterEach(() => {
  process.env.USER_COUNT == "0";
});
describe("User Service", () => {
  describe("userRegistration", () => {
    it("Successful Registration When User Does Not Exist", async () => {
      const response = await userRegistration(
        "newUser",
        "new@example.com",
        "pas@123",
        "pas@123"
      );
      expect(response.code).toBe(201);
      expect(response.message).toBe("User Registered!")
    });
    it("Return User Already Exist When User Exist", async () => {
      process.env.USER_COUNT = "1";
      const response = await userRegistration(
        "newUser",
        "new@example.com",
        "pas@123",
        "pas@123"
      );
      expect(response.code).toBe(409);
      expect(response.message).toBe("User Already Exist")
    });
    it("Return Error is Password not Matched With Confirm Password", async () => {
      const response = await userRegistration(
        "newUser",
        "new@example.com",
        "pas@123",
        "pas@321"
      );
      expect(response.code).toBe(400);
      expect(response.message).toBe("Password-Confirm Password Mismatch");
    });
  });

  describe("LogIn", () => {
    it("Successful Registration When User Exist and Correct Password", async () => {
      process.env.USER_COUNT = "1";
      const response = await userLogIn("new@example.com", "pas@123");
      expect(response.code).toBe(200);
      expect(response.message).toBe("Logged In!");
      expect(response.data).toHaveProperty('token');
      expect(response.data.token).not.toBeNull();
    });
    it("Return Error User Not Found When User Not Exist", async () => {
      process.env.USER_COUNT = "0";
      const response = await userLogIn("new@example.com", "pas@123");
      expect(response.code).toBe(404);
      expect(response.message).toBe("User Not Found");
    });
    it("Return Error When Wrong Password", async () => {
      process.env.USER_COUNT = "1";
      const response = await userLogIn("new@example.com", "pas@12");
      expect(response.code).toBe(401);
      expect(response.message).toBe("Invalid Credentials!");
    });
  });

  describe("Get Profile", () => {
    it("Get Profile If User Exist", async () => {
      process.env.USER_COUNT = "1";
      const response = await userProfile(1);
      expect(response.code).toBe(200);
      expect(response.message).toBe("User Profile");
      expect(response.data).toMatchObject({
        username: expect.any(String),
        email: expect.any(String),
        role: expect.any(String) 
      });
    });
    it("Return Error User Not Found When User Not Exist", async () => {
      process.env.USER_COUNT = "0";
      const response = await userProfile(0);
      expect(response.code).toBe(404);
      expect(response.message).toBe("Profile Not Found");
    });
  });
});
