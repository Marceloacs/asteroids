import { AsteroidsSortBy } from "asteroids-schema";

export function parseAsteroidsSortBy(sortBy: string): AsteroidsSortBy {
    switch (sortBy) {
        case "name":
            return "name";
        case "diameter":
            return "diameter";
        case "date":
        default:
            return "date";
    }
}
