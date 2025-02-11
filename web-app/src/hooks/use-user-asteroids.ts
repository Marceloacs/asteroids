import { useAddUserFavoriteAsteroid, useRemoveUserFavoriteAsteroid } from "@/operations/user-asteroids";

export const useUserAsteroids = () => {
    const { mutate: addFavoriteAsteroid, isPending: isLoadingAddFavoriteAsteroid } = useAddUserFavoriteAsteroid();
    const { mutate: removeFavoriteAsteroid, isPending: isLoadingRemoveFavoriteAsteroid } = useRemoveUserFavoriteAsteroid();

    return {
        addFavoriteAsteroid,
        removeFavoriteAsteroid,
        isLoadingAddFavoriteAsteroid,
        isLoadingRemoveFavoriteAsteroid,
    };  
};  