import { SortOrder } from "asteroids-schema";

export function parseSort(sortBy?: string): SortOrder {
    if(sortBy === "asc") {
        return "asc";
    }
    return "desc";
}
