import type { Response } from "express";
import type { BaseRequest } from "../../../models/base-request";
import addFavoriteAsteroidService from "./service";

export default async function addFavoriteAsteroidController(req: BaseRequest, res: Response) {
    try {
        const { asteroidId } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!asteroidId) {
            return res.status(400).json({ message: "Asteroid ID is required" });
        }

        const success = await addFavoriteAsteroidService(user.id, asteroidId);
        if (!success) {
            return res.status(400).json({ message: "Asteroid already in favorites" });
        }
        return res.status(200).json({ message: "Asteroid added to favorites", success });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
