import { type Request, type Response } from "express";
import getAsteroidsDetailService from "./service";
import type { AsteroidDetailPayload } from "asteroids-schema";

export default async function getAsteroidsDetailController(req: Request, res: Response) {
    try {
        const { id, date } = req.query;

        const payload: AsteroidDetailPayload = {
            id: id as string,
            date: date as string,
        }

        const response = await getAsteroidsDetailService(payload);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

