import { AsteroidDetailPayload, AsteroidDetailResponse, GetAsteroidsListPayload, GetAsteroidsListResponse } from "asteroids-schema";
import useRequest from "../hooks/use-request";
import { useQuery } from "@tanstack/react-query";
import { ASTEROIDS_QUERY_KEY } from "../constants/query-keys";


export function useGetAsteroidsOperation(payload: GetAsteroidsListPayload, enabled = true){
    const request = useRequest();

    const { startDate, endDate, rowsPerPage, page, sortBy, sortOrder, isHazardous = false, onlyFavs = false } = payload;

    return useQuery({
        queryKey: [ASTEROIDS_QUERY_KEY, startDate, endDate, rowsPerPage, page, sortBy, sortOrder, isHazardous, onlyFavs],
        queryFn: async () => {
            const { data } = await request.get<GetAsteroidsListPayload, { data: GetAsteroidsListResponse }>('/asteroids/list', { params: payload });
            return data;
        },
        enabled
    });
}

export function useGetAsteroidDetailOperation(payload: AsteroidDetailPayload) {
    const request = useRequest();

    return useQuery({
        queryKey: [ASTEROIDS_QUERY_KEY, payload.id],
        queryFn: async () => {
            const { data } = await request.get<AsteroidDetailPayload, { data: AsteroidDetailResponse }>('/asteroids/detail', { params: payload });
            return data;
        },
    });
}