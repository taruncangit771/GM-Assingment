import express from 'express';
import { validator } from '../../utills/commonHelper';
import { register,logIn,getProfile } from '../../controllers/user.controller';
import { isAuthenticated, isUser } from '../../middleware/authentication.middleware';
import { loginUserSchema, registerUserSchema } from '../../utills/request_schemas/v1/user_req.schema';

const router = express.Router();

router.route("/register").post(validator(registerUserSchema),register)
router.route("/logIn").post(validator(loginUserSchema),logIn)
router.route("/getProfile").get(isAuthenticated,isUser,getProfile)

export default router;
