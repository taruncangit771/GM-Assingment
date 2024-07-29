import {
  createGame,
  deleteGame,
  getSingleGame,
  updateGame,
} from "../../services/game.service";

beforeEach(() => {
  process.env.GAME_COUNT = "0";
});
afterEach(() => {
  process.env.GAME_COUNT = "0";
});
let currentDate = new Date(Date.now());
let day = currentDate.getDate() + 1;
let month = currentDate.getMonth() + 1;
let modefiedMonth:string;
if(month<10) modefiedMonth = `0${month}`
let year = currentDate.getFullYear();
describe("Game Service", () => {
  describe("Create Game", () => {
    it("Create Game If No Game Is Exist With Given Name", async () => {
      const response = await createGame("Taken3", "Action", "2024-07-30");
      expect(response.code).toBe(200);
      expect(response.success).toBe(true);
      expect(response.message).toBe("New Game Created!");
    });
    it("Return Error If Game Already Exist With Same Name", async () => {
      process.env.GAME_COUNT = "1";
      const response = await createGame("Taken3", "Action", "2024-07-30");
      expect(response.code).toBe(400);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Use Different Name: Already In Use");
    });
    it("Return Error If Release Date Is Any Past Date", async () => {
      const response = await createGame("Taken3", "Action", "2024-07-21");
      expect(response.code).toBe(400);
      expect(response.success).toBe(false);
      expect(response.message).toBe(
        "You Cant Create A Game With Past Release Date"
      );
    });
  });
  describe("Create Game", () => {
    it("Create Game If No Game Is Exist With Given Name", async () => {
      const response = await createGame("Taken3", "Action",  `${year}-${modefiedMonth}-${day}`);
      expect(response.code).toBe(200);
      expect(response.success).toBe(true);
      expect(response.message).toBe("New Game Created!");
    });
    it("Return Error If Game Already Exist With Same Name", async () => {
      process.env.GAME_COUNT = "1";
      const response = await createGame("Taken3", "Action",  `${year}-${modefiedMonth}-${day}`);
      expect(response.code).toBe(400);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Use Different Name: Already In Use");
    });
    it("Return Error If Release Date Is Any Past Date", async () => {
      const response = await createGame(
        "Taken3",
        "Action",
        `2024-07-20`
      );
      expect(response.code).toBe(400);
      expect(response.success).toBe(false);
      expect(response.message).toBe(
        "You Cant Create A Game With Past Release Date"
      );
    });
  });
  describe("getSingleGame", () => {
    it("Get Game If Exist", async () => {
      process.env.GAME_COUNT = "1";
      const response = await getSingleGame(1);
      expect(response.code).toBe(200);
      expect(response.success).toBe(true);
      expect(response.message).toBe("Game");
      expect(response.data).toMatchObject({
        id: expect.any(Number),
        name: expect.any(String),
        genre: expect.any(String),
        releaseDate: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        is_deleted: expect.any(Number),
      });
    });
    it("Error If Game Not Exist Or Deleted", async () => {
      const response = await getSingleGame(1);
      expect(response.code).toBe(404);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Wrong Id: Game Not Found");
    });
  });

  describe("updateGame", () => {
    it("Error, If Try To Update Release Date To Some Previous Date", async () => {
      const response = await updateGame(1, undefined, undefined, "2024-07-21");
      expect(response.code).toBe(400);
      expect(response.success).toBe(false);
      expect(response.message).toBe(
        "You Cant Update A Game's Release Date With Past One"
      );
    });
    it("Error If Game Not Exist Or Deleted", async () => {
      const response = await updateGame(1, "gta");
      expect(response.code).toBe(404);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Wrong Id: Game Not Found");
    });
    it("Error If Game Not Exist Or Deleted", async () => {
      const response = await updateGame(1, "gta");
      expect(response.code).toBe(404);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Wrong Id: Game Not Found");
    });
    it("Successfull Update", async () => {
      process.env.GAME_COUNT = "1";
      const response = await updateGame(1, "gta");
      expect(response.code).toBe(200);
      expect(response.success).toBe(true);
      expect(response.message).toBe("Game Details Update");
    });
  });
  describe("deleteGame", () => {
    it("Error If Game Not Exist or Deleted", async () => {
      const response = await deleteGame(1);
      expect(response.code).toBe(404);
      expect(response.success).toBe(false);
      expect(response.message).toBe("Wrong Id: Game Not Found");
    });
    it("Delete Successfully", async () => {
      process.env.GAME_COUNT = "1";
      const response = await deleteGame(1);
      expect(response.code).toBe(200);
      expect(response.success).toBe(true);
      expect(response.message).toBe("Game Deleted");
    });
  });
});
