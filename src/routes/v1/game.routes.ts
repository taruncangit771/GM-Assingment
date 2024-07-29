import express from 'express';
import { create,getGame,getGames,update,del } from '../../controllers/game.controller';
import { isAdmin, isAuthenticated } from '../../middleware/authentication.middleware';
import { validator } from '../../utills/commonHelper';
import { createGameSchema } from '../../utills/request_schemas/v1/game_req.schema';
const router = express.Router();

router.route("/create").post(isAuthenticated,isAdmin,validator(createGameSchema),create)
router.route("/getGame/:id").get(isAuthenticated,getGame)
router.route("/getGames").get(isAuthenticated,getGames)
router.route("/update/:id").patch(isAuthenticated,isAdmin,update)
router.route("/delete/:id").delete(isAuthenticated,isAdmin,del)

export default router;
