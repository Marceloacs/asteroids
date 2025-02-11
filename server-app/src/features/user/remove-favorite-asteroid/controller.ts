import type { Response } from "express";
import type { BaseRequest } from "../../../models/base-request";
import removeFavoriteAsteroidService from "./service";

export default async function removeFavoriteAsteroidController(req: BaseRequest, res: Response) {
    try {
        const { asteroidId } = req.body;
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (!asteroidId) {
            return res.status(400).json({ message: "Asteroid ID is required" });
        }

        const success = await removeFavoriteAsteroidService(user.id, asteroidId);
        return res.json({ success });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
