import type { GetNasaAsteroidDetailPayload, GetNasaAsteroidsResponse } from "asteroids-schema";
import { NASA_API_KEY } from "../../constants/env";

export async function getNasaAsteroidDetail(payload: GetNasaAsteroidDetailPayload) {

    // The right way to get the asteroid detail is to detail the asteroid by id
    // but the api is not working, so we are using the feed api to get the asteroid detail
    const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${payload.date}&end_date=${payload.date}&api_key=${NASA_API_KEY}`);
    const data = await response.json() as GetNasaAsteroidsResponse;
    const asteroid = data.near_earth_objects[payload.date].find((asteroid) => asteroid.id === payload.id);

    /* 
    FAKE DATA
    const data = await getFakeResponse();
    const asteroid = data.near_earth_objects[payload.date].find((asteroid) => asteroid.id === payload.id); 
    */

    return asteroid
}