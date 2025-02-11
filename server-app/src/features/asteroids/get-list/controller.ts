import { type AsteroidsSortBy, type GetAsteroidsListPayload, type SortOrder } from "asteroids-schema";
import { type Request, type Response } from "express";
import parsePayloadDate from "../../../utils/parse-payload-date";
import getAsteroidsListService from "./service";
import type { BaseRequest } from "../../../models/base-request";

export default async function getAsteroidsListController(req: BaseRequest, res: Response) {
    try {
        const { startDate, endDate, rowsPerPage, page, isHazardous, onlyFavs } = req.query;
        const userId = req.user?.id;

        const payload: GetAsteroidsListPayload = {
            startDate: parsePayloadDate(startDate as string, new Date()).toISOString(),
            endDate: parsePayloadDate(endDate as string, new Date()).toISOString(),
            rowsPerPage: Number(rowsPerPage),
            page: Number(page),
            sortBy: req.query.sortBy as AsteroidsSortBy,
            sortOrder: req.query.sortOrder as SortOrder,
            userId: userId,
            isHazardous: isHazardous === 'true',
            onlyFavs: onlyFavs === 'true',
        }

        const response = await getAsteroidsListService(payload);

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

