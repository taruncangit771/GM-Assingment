import { ValidationSchema } from "../../commonHelper";
export const registerUserSchema: ValidationSchema = {
  name: { required: true, type: "string" },
  email: { required: true, type: "string" },
  password: { required: true, type: "string" },
  confirmPassword: { required: true, type: "string" }
};

export const loginUserSchema: ValidationSchema = {
    email: { required: true, type: "string" },
    password: { required: true, type: "string" },
  };
