import type { GetNasaAsteroidsPayload, GetNasaAsteroidsResponse } from "asteroids-schema";
// import { getFakeResponse } from "./fake-data";

const NASA_API_KEY = process.env.NASA_API_KEY || "DEMO_KEY";

export async function getNasaAsteroids(payload: GetNasaAsteroidsPayload): Promise<GetNasaAsteroidsResponse> {
    try {
        const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${payload.startDate}&end_date=${payload.endDate}&api_key=${NASA_API_KEY}`);
        const data = await response.json() as GetNasaAsteroidsResponse;
        console.log("data", data);
        return data;
        // FAKE DATA
        // return await getFakeResponse();
    } catch (error) {
        console.error("=====> error", error);
        throw error;
    }
}

