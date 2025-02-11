import { addFavoriteAsteroid, getAsteroidFavoriteId } from "../../../integrations/db/user-asteroid";

export default async function addFavoriteAsteroidService(userId: string, asteroidId: string) {
    try {

        const asteroidFavoriteId = await getAsteroidFavoriteId(userId, asteroidId);
        if (asteroidFavoriteId) {
            return {
                success: true,
            };
        }
        const success = await addFavoriteAsteroid(userId, asteroidId);
        return {
            success
        };
    } catch (error) {
        console.error(error);
        throw error;
    }
}
