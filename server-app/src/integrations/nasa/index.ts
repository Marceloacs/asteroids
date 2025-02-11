/// Hagamos una clase NasaIntegration que tenga los siguientes métodos:
/// - getAsteroids
/// - getAsteroidById
/// - getAsteroidsByDateRange
/// - getAsteroidsByDate
/// - getAsteroidsByDateRange
/// - getAsteroidsByDateRange

import { type GetNasaAsteroidDetailPayload, type GetNasaAsteroidDetailResponse, type GetNasaAsteroidsPayload, type GetNasaAsteroidsResponse } from "asteroids-schema";
import { getNasaAsteroidDetail } from "./get-asteroid-detail";
import { getNasaAsteroids } from "./get-asteroids";

export class Nasa {
    async getAsteroids(payload: GetNasaAsteroidsPayload): Promise<GetNasaAsteroidsResponse> {
        const startDate = this.parseNasaApiDate(payload.startDate);
        const endDate = this.parseNasaApiDate(payload.endDate);
        return await getNasaAsteroids({ ...payload, startDate, endDate });
    }

    async getAsteroidDetail(payload: GetNasaAsteroidDetailPayload): Promise<GetNasaAsteroidDetailResponse | null> {
        const date = this.parseNasaApiDate(payload.date);
        const data = await getNasaAsteroidDetail({ id: payload.id, date });
        return data ? { asteroid: data } : null;
    }

    private parseNasaApiDate(date: string) {
        return new Date(date).toISOString().split("T")[0];
    }
}