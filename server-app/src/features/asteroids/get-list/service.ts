import { type Asteroid, type AsteroidsSortBy, type GetAsteroidsListPayload, type GetAsteroidsListResponse, type SortOrder } from "asteroids-schema";
import { getFavoriteAsteroids } from "../../../integrations/db/user-asteroid";
import { Nasa } from "../../../integrations/nasa";

export default async function getAsteroidsListService({ startDate, endDate, rowsPerPage, page, sortBy, sortOrder, userId, isHazardous, onlyFavs }: GetAsteroidsListPayload): Promise<GetAsteroidsListResponse> {
    try {

        const nasa = new Nasa();
        const asteroids = await nasa.getAsteroids({ startDate, endDate })
        const nearObjects = asteroids.near_earth_objects || [];

        const userAsteroids = userId ? await getFavoriteAsteroids(userId) : []
        const userAsteroidIds = new Set(userAsteroids.map((asteroid) => asteroid.asteroid_id))

        const asteroidsList = filterAsteroids(Object.keys(nearObjects).map((date) => {
            return nearObjects[date].map((asteroid) => {
                return {
                    date,
                    id: asteroid.id,
                    name: asteroid.name,
                    diameter: asteroid.estimated_diameter.meters.estimated_diameter_max,
                    isHazardous: asteroid.is_potentially_hazardous_asteroid,
                    isFavorite: userAsteroidIds.has(asteroid.id),
                } as Asteroid
            })
        }).flat(), isHazardous, onlyFavs)

        const total = asteroidsList.length;

        return {
            asteroids: paginateAsteroids(sortAsteroids(asteroidsList, sortBy, sortOrder), rowsPerPage, page),
            total,
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch asteroids list");
    }
}

function sortAsteroids(asteroids: Asteroid[], sortBy: AsteroidsSortBy, sortOrder: SortOrder) {
    switch (sortBy) {
        case "diameter":
            return sortByDiameter(asteroids, sortOrder);
        case 'name':
            return sortByName(asteroids, sortOrder);
        case "date":
        default:
            return sortByDate(asteroids, sortOrder);
    }
}

function sortByName(asteroids: Asteroid[], sortOrder: SortOrder) {
    return asteroids.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.name.localeCompare(b.name);
        } else {
            return b.name.localeCompare(a.name);
        }
    });
}

function sortByDiameter(asteroids: Asteroid[], sortOrder: SortOrder) {
    return asteroids.sort((a, b) => {
        if (sortOrder === "asc") {
            return a.diameter - b.diameter;
        } else {
            return b.diameter - a.diameter;
        }
    });
}

function sortByDate(asteroids: Asteroid[], sortOrder: SortOrder) {
    return asteroids.sort((a, b) => {
        if (sortOrder === "asc") {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        } else {
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        }
    });
}

function filterAsteroids(asteroids: Asteroid[], isHazardous?: boolean, onlyFavs?: boolean) {
    return asteroids.filter((asteroid) => {
        if (isHazardous) {
            return asteroid.isHazardous;
        }
        if (onlyFavs) {
            return asteroid.isFavorite;
        }
        return true;
    });
}
function paginateAsteroids(asteroids: Asteroid[], rowsPerPage: number, page: number) {
    return asteroids.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}