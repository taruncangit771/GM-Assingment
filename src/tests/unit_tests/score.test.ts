import {
  addScore,
  getScoreByGame,
  getScoreByUser,
} from "../../services/score.service";

beforeEach(() => {
  process.env.GAME_COUNT = "0";
});
afterEach(() => {
  process.env.GAME_COUNT = "0";
});
describe("Score Service", () => {
  describe("addScore", () => {
    it("If Wronge gameId Is Recived Return , Game Not Exist", async () => {
      const response = await addScore(1, 2, 500);
      expect(response.code).toBe(400)
      expect(response.success).toBe(false)
      expect(response.message).toBe("Game Not Exist!");
    });
    it("Return User Already Exist When User Exist", async () => {
      process.env.GAME_COUNT = "1";
      const response = await addScore(1, 2, 500);
      expect(response.code).toBe(200)
      expect(response.success).toBe(true)
      expect(response.message).toBe("Score Added!");
    });
  });

  describe("getScoreByUser", () => {
    it("Get Paginated Score By User", async () => {
      const response = await getScoreByUser(1, 1, 10, "created_at", "desc");
      expect(response.code).toBe(200)
      expect(response.success).toBe(true)
      expect(response.message).toBe("User Scores");
      expect(response.data).toMatchObject({
        data: expect.any(Array),
        metadata: expect.any(Object),
      });
    });
  });

  describe("getScoreByGame", () => {
    it("Get Paginated Score By Game", async () => {
      const response = await getScoreByGame(1, 1, 10, "created_at", "desc");
      expect(response.code).toBe(200)
      expect(response.success).toBe(true)
      expect(response.message).toBe("User Scores");
      expect(response.data).toMatchObject({
        data: expect.any(Array),
        metadata: expect.any(Object),
      });
    });
  });
});
