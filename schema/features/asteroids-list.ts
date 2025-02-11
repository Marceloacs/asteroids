import type { Asteroid } from "../models/asteroid";
import type { SortOrder } from "../utils/sort";

export type AsteroidsSortBy = "date" | "name" | "diameter" | "isHazardous";

export interface GetAsteroidsListPayload {
    startDate: string;
    endDate: string;
    rowsPerPage: number;
    page: number;
    sortBy: AsteroidsSortBy;
    sortOrder: SortOrder;
    userId?: string;
    isHazardous?: boolean;
    onlyFavs?: boolean;
}

export interface GetAsteroidsListResponse {
    asteroids: Asteroid[];
    total: number;
}
