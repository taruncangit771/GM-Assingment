// routes.mjs
import express from 'express';
import { isAuthenticated, isUser } from '../../middleware/authentication.middleware';
import { validator } from '../../utills/commonHelper';
import { addScoreSchema } from '../../request_schemas/v1/score_req.schema';
import { add,getByUser,getByGame } from '../../controllers/score.controller';

const router = express.Router();

router.route("/add").post(isAuthenticated,isUser,validator(addScoreSchema),add)
router.route("/getByUser/:id").get(isAuthenticated,getByUser)
router.route("/getByGame/:id").get(isAuthenticated,getByGame)

export default router;
