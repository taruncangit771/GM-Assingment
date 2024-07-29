import { ValidationSchema } from "../../commonHelper";
export const addScoreSchema: ValidationSchema = {
  gameId: { required: true, type: "number" },
  score: { required: true, type: "number" },
};
