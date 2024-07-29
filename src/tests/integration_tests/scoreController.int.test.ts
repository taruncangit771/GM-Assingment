import request from "supertest";
import server from "../../server";

beforeEach(() => {
    process.env.GAME_COUNT = "0";
});
afterEach(() => {
    process.env.GAME_COUNT = "0";
});
afterAll(() => {
  server.close();
});

describe("Score API'S", () => {
  describe("POST /api/v1/scores/add", () => {
    it("Should Add Score", async () => {
      const requestBody = {
        gameId: 2,
        score: 200,
      };
      process.env.GAME_COUNT = "1";

      const response = await request(server)
        .post("/api/v1/scores/add")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Score Added!");
    });

    it("Return Error , If Called With Wrong gameId", async () => {
      const requestBody = {
        gameId: 2,
        score: 200,
      };
      process.env.GAME_COUNT = "0";

      const response = await request(server)
        .post("/api/v1/scores/add")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);

      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Game Not Exist!");
    });

    it("Return Error , If Admin Called It", async () => {
      const requestBody = {
        gameId: 2,
        score: 200,
      };
      process.env.GAME_COUNT = "0";

      const response = await request(server)
        .post("/api/v1/scores/add")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);

      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Unauthorized Request:Not Supposed To Access This Resource"
      );
    });
  });

  describe("POST /api/v1/scores/getByUser", () => {
    it("Successfully Get Paginated Scores Related To Single User", async () => {
      const response = await request(server)
        .get("/api/v1/scores/getByUser/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User Scores");
      expect(response.body.data).toMatchObject({
        data: expect.any(Array),
        metadata: expect.any(Object),
      });
    });
  });
  describe("POST /api/v1/scores/getByGame", () => {
    it("Successfully Get Paginated Scores Related To Single Game", async () => {
      const response = await request(server)
        .get("/api/v1/scores/getByGame/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User Scores");
      expect(response.body.data).toMatchObject({
        data: expect.any(Array),
        metadata: expect.any(Object),
      });
    });
  });
});
