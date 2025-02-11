import { ASTEROIDS_QUERY_KEY, USER_FAVORITE_ASTEROIDS_QUERY_KEY } from "@/constants/query-keys";
import useAuth from "@/hooks/use-auth";
import useRequest from "@/hooks/use-request";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSignInOperation = (onSuccess?: () => void) => {
    const request = useRequest();
    const queryClient = useQueryClient();
    const { setUserAndToken } = useAuth();
    return useMutation({
        mutationFn: (name: string) => request.post<{
            token: string, user: {
                id: string,
                name: string,
                created_at: string
            }
        }>("/auth/sign-in", { name }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [USER_FAVORITE_ASTEROIDS_QUERY_KEY] });
            queryClient.invalidateQueries({ queryKey: [ASTEROIDS_QUERY_KEY] });
            setUserAndToken(data.data.token);
            onSuccess?.();
        },
    })
};
