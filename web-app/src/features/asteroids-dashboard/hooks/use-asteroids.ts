import { useGetAsteroidsOperation } from "@/operations/asteroids";
import { useMemo } from "react";
import useAsteroidsFilters from "./use-filters";


export default function useAsteroids() {

    const { startDate, endDate, rowsPerPage, page, sortBy, sortOrder, isHazardous, onlyFavs, dateRangeError } = useAsteroidsFilters();

    const isQueryEnabled = !dateRangeError && !!startDate && !!endDate;

    const { data, isLoading, error } = useGetAsteroidsOperation({
        startDate,
        endDate,
        rowsPerPage,
        page,
        sortBy,
        sortOrder,
        isHazardous,
        onlyFavs,
    }, isQueryEnabled);

    const { asteroids, total, pages } = useMemo(() => {

        if(!data){
            return {
                asteroids: [],
                total: 0,
                pages: 0,
            }
        }
        return {
            asteroids: data.asteroids || [],
            total: data.total || 0,
            pages: Math.ceil(data.total / rowsPerPage),
        }
    }, [data, rowsPerPage]);

    return {
        asteroids,
        total,
        isLoading,
        error,
        startDate,
        endDate,
        rowsPerPage,
        page,
        sortBy,
        sortOrder,
        pages,
    }   
}