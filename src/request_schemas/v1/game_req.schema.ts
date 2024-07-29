import { ValidationSchema } from "../../utills/commonHelper";
export const createGameSchema: ValidationSchema = {
  name: { required: true, type: "string" },
  genre: { required: true, type: "string" },
  releaseDate: { required: true, type: "date" },
};
