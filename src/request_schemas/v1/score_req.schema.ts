import { ValidationSchema } from "../../utills/commonHelper";
export const addScoreSchema: ValidationSchema = {
  gameId: { required: true, type: "number" },
  score: { required: true, type: "number" },
};
