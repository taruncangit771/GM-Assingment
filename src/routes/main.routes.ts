import express from 'express';

const router = express.Router();

import v1UserRoutes from "./v1/user.routes"
import v1GameRoutes from "./v1/game.routes"
import v1ScoreRoutes from "./v1/score.routes"

router.use("/v1/users",v1UserRoutes)
router.use("/v1/games",v1GameRoutes)
router.use("/v1/scores",v1ScoreRoutes)

export default router;
