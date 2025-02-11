import { Router } from "express";
import addFavoriteAsteroidController from "./add-favorite-asteroid/controller";
import removeFavoriteAsteroidController from "./remove-favorite-asteroid/controller";

const UserRouter = Router();

UserRouter.post("/add-asteroid", (req, res) => {
    addFavoriteAsteroidController(req, res);
});
UserRouter.delete("/remove-asteroid", (req, res) => {
    removeFavoriteAsteroidController(req, res);
});

export default UserRouter;  