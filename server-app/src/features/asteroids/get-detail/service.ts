import { type AsteroidDetailPayload, type AsteroidDetailResponse } from "asteroids-schema";
import { Nasa } from "../../../integrations/nasa";

export default async function getAsteroidsDetailService({ id, date }: AsteroidDetailPayload): Promise<AsteroidDetailResponse> {
    try {

        const nasa = new Nasa();
        const asteroid = await nasa.getAsteroidDetail({ id, date })

        if (!asteroid) {
            throw new Error("Asteroid not found");
        }

        return {
            detail: {
                id: asteroid.asteroid.id,
                date: asteroid.asteroid.close_approach_data[0].close_approach_date,
                name: asteroid.asteroid.name,
                diameter: asteroid.asteroid.estimated_diameter.meters.estimated_diameter_max,
                isHazardous: asteroid.asteroid.is_potentially_hazardous_asteroid,
                link: asteroid.asteroid.nasa_jpl_url,
                absoluteMagnitudeH: asteroid.asteroid.absolute_magnitude_h,
                isSentryObject: asteroid.asteroid.is_sentry_object,
                nasaJPLURL: asteroid.asteroid.nasa_jpl_url,
                velocity: asteroid.asteroid.close_approach_data[0].relative_velocity.kilometers_per_hour,
            }
        }
    } catch (error) {
        console.error(error);
        throw new Error("Failed to fetch asteroids list");
    }
}
