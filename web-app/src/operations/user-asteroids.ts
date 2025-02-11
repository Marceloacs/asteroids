import { ASTEROIDS_QUERY_KEY, USER_FAVORITE_ASTEROIDS_QUERY_KEY } from "@/constants/query-keys";
import useRequest from "@/hooks/use-request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetUserFavoriteAsteroids = () => {
    const request = useRequest();
    return useQuery({
        queryKey: [USER_FAVORITE_ASTEROIDS_QUERY_KEY],
        queryFn: () => request.get("/user/favorite-asteroids"),
    });
};

export const useAddUserFavoriteAsteroid = () => {
    const request = useRequest();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (asteroidId: string) => request.post("/user/add-asteroid", { asteroidId }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USER_FAVORITE_ASTEROIDS_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [ASTEROIDS_QUERY_KEY] });
        },
    });
};

export const useRemoveUserFavoriteAsteroid = () => {
    const request = useRequest();
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (asteroidId: string) => request.delete("/user/remove-asteroid", { data: { asteroidId } }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [USER_FAVORITE_ASTEROIDS_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [ASTEROIDS_QUERY_KEY] });
        },
    });
};  