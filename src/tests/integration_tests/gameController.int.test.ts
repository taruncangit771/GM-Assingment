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
let currentDate = new Date(Date.now());
let day = currentDate.getDate() + 1;
let month = currentDate.getMonth() + 1;
let modefiedMonth: string;
if (month < 10) modefiedMonth = `0${month}`;
let year = currentDate.getFullYear();
describe("Game API'S", () => {
  describe("POST /api/v1/games/create", () => {
    it("Should Create Game If Everything Is Okay", async () => {
      const requestBody = {
        name: "Taken3",
        genre: "Action",
        releaseDate: `${year}-${modefiedMonth}-${day}`,
      };
      process.env.GAME_COUNT = "0";

      const response = await request(server)
        .post("/api/v1/games/create")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("New Game Created!");
    });

    it("Return Error , If Game With Same Game Name Already Exist", async () => {
      const requestBody = {
        name: "Taken3",
        genre: "Action",
        releaseDate: `${year}-${modefiedMonth}-${day}`,
      };
      process.env.GAME_COUNT = "1";

      const response = await request(server)
        .post("/api/v1/games/create")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Use Different Name: Already In Use");
    });

    it("Authentication Error , If User Called It", async () => {
      const requestBody = {
        name: "Taken3",
        genre: "Action",
        releaseDate: `${year}-${modefiedMonth}-${day}`,
      };
      process.env.GAME_COUNT = "0";
      const response = await request(server)
        .post("/api/v1/games/create")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);
      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Unauthorized Request:Not Supposed To Access This Resource"
      );
    });
    it("Validation Error , If Any Of Required Field Is Not Recived InRequest", async () => {
      const requestBody = {
        name: "Taken3",
        releaseDate: `${year}-${month}-${day}`,
      };
      process.env.GAME_COUNT = "0";
      const response = await request(server)
        .post("/api/v1/games/create")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Errors");
      expect(response.body.errors[0]).toBe("Field genre is required");
    });
    it("Validation Error , If yyyy-mm-dd formet date Is Not Recived InRequest for release date field", async () => {
      const requestBody = {
        name: "Taken3",
        genre: "Action",
        releaseDate: `${day}-${month}-${year}`,
      };
      process.env.GAME_COUNT = "0";
      const response = await request(server)
        .post("/api/v1/games/create")
        .send(requestBody)
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Validation Errors");
      expect(response.body.errors[0]).toBe(
        "Invalid date format. Use YYYY-MM-DD for releaseDate"
      );
    });
  });

  describe("GET /api/v1/games/getGame/:id", () => {
    it("Successfully Get Game Related To Id If Exist", async () => {
      process.env.GAME_COUNT = "1";
      const response = await request(server)
        .get("/api/v1/games/getGame/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Game");
      expect(response.body.data).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        genre: expect.any(String),
        releaseDate: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        is_deleted: expect.any(Number),
      });
    });
    it("Return Error If Game With Id Not Exist iN DB", async () => {
      process.env.GAME_COUNT = "0";
      const response = await request(server)
        .get("/api/v1/games/getGame/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Wrong Id: Game Not Found");
    });
  });
  describe("GET /api/v1/games/getGames", () => {
    it("Successfully Get Paginated Games", async () => {
      const response = await request(server)
        .get("/api/v1/games/getGames")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Game List");
      expect(response.body.data).toMatchObject({
        data: expect.any(Array),
        metadata: expect.any(Object),
      });
    });
  });
  describe("PATCH /api/v1/games/update/:id", () => {
    it("Update Game Successfully", async () => {
      process.env.GAME_COUNT = "1";
      const response = await request(server)
        .patch("/api/v1/games/update/1?name=GTA3")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Game Details Update");
    });
    it("Authentication Error If Called With User Previlage", async () => {
      process.env.GAME_COUNT = "1";
      const response = await request(server)
        .patch("/api/v1/games/update/1?name=GTA3")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);
      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Unauthorized Request:Not Supposed To Access This Resource"
      );
    });
    it("Return Error Try To Update Release Date With Past Date", async () => {
      process.env.GAME_COUNT = "1";
      const response = await request(server)
        .patch("/api/v1/games/update/1?releaseDate=2024-07-25")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(400);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "You Cant Update A Game's Release Date With Past One"
      );
    });
    it("Return Error Game With This Id Not Exist Or Deleted", async () => {
      process.env.GAME_COUNT = "0";
      const response = await request(server)
        .patch("/api/v1/games/update/1?name=GTA4")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Wrong Id: Game Not Found");
    });
  });
  describe("DELETE /api/v1/games/delete/:id", () => {
    it("Delete Game Successfully", async () => {
      process.env.GAME_COUNT = "1";
      const response = await request(server)
        .delete("/api/v1/games/delete/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("Game Deleted");
    });
    it("Authentication Error If Called With User Previlage", async () => {
      process.env.GAME_COUNT = "1";
      const response = await request(server)
        .delete("/api/v1/games/delete/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.USER}`);
      expect(response.status).toBe(403);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe(
        "Unauthorized Request:Not Supposed To Access This Resource"
      );
    });
    it("Return Error Game With This Id Not Exist Or Deleted Already", async () => {
      process.env.GAME_COUNT = "0";
      const response = await request(server)
        .delete("/api/v1/games/delete/1")
        .set("Accept", "application/json")
        .set("Authorization", `Bearer ${process.env.ADMIN}`);
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("Wrong Id: Game Not Found");
    });
  });
});
