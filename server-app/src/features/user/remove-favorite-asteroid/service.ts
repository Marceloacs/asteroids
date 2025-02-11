import { removeFavoriteAsteroid } from "../../../integrations/db/user-asteroid";

export default async function removeFavoriteAsteroidService(userId: string, asteroidId: string) {
    try {
        const success = await removeFavoriteAsteroid(userId, asteroidId);
        return {
            success
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
