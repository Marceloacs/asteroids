import { parseAsteroidsSortBy } from "@/helpers/asteroids";
import { parseSort } from "@/helpers/sort";
import { AsteroidsSortBy, SortOrder } from "asteroids-schema";
import { GetAsteroidsListPayload } from "asteroids-schema";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

const DEFAULT_START_DATE = new Date().toISOString().split("T")[0];
const DEFAULT_END_DATE = new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split("T")[0];
const DEFAULT_ROWS_PER_PAGE = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_SORT_BY = "date";
const DEFAULT_SORT_ORDER = "desc";

export default function useAsteroidsFilters() {

    const searchParams = useSearchParams();
    const router = useRouter();

    const startDateParam = searchParams.get("startDate")
    const endDateParam = searchParams.get("endDate")
    const rowsPerPageParam = searchParams.get("rowsPerPage")
    const pageParam = searchParams.get("page")
    const sortByParam = searchParams.get("sortBy")
    const sortOrderParam = searchParams.get("sortOrder")
    const isHazardousParam = searchParams.get("isHazardous")
    const onlyFavsParam = searchParams.get("onlyFavs")

    const startDate = startDateParam || DEFAULT_START_DATE;
    const endDate = endDateParam || DEFAULT_END_DATE;
    const rowsPerPage = rowsPerPageParam && !isNaN(Number(rowsPerPageParam)) ? Number(rowsPerPageParam) : DEFAULT_ROWS_PER_PAGE;
    const page = pageParam && !isNaN(Number(pageParam)) ? Number(pageParam) : DEFAULT_PAGE;
    const sortBy = parseAsteroidsSortBy(sortByParam || DEFAULT_SORT_BY);
    const sortOrder = parseSort(sortOrderParam || DEFAULT_SORT_ORDER);
    const isHazardous = isHazardousParam === "true";
    const onlyFavs = onlyFavsParam === "true";

    const updateQueryString = useCallback(
        (payload: Partial<GetAsteroidsListPayload>) => {
            const params = new URLSearchParams(searchParams.toString())
            for (const [key, value] of Object.entries(payload)) {
                if(value === undefined || (typeof value === "boolean" && value === false)){
                    params.delete(key);
                }else{
                    params.set(key, String(value));
                }
            }
            router.push(`?${params.toString()}`);
        },
        [searchParams, router]
    )

    const updateStartDate = useCallback(
        (date: string) => {
            updateQueryString({ startDate: date, page: DEFAULT_PAGE });
        },
        [updateQueryString]
    )

    const updateEndDate = useCallback(
        (date: string) => {
            updateQueryString({ endDate: date, page: DEFAULT_PAGE });
        },
        [updateQueryString]
    )

    const updateRowsPerPage = useCallback(
        (rowsPerPage: number) => {
            updateQueryString({ rowsPerPage, page: DEFAULT_PAGE });
        },
        [updateQueryString]
    )

    const updatePage = useCallback(
        (page: number) => {
            updateQueryString({ page });
        },
        [updateQueryString]
    )

    const updateSortBy = useCallback(
        (sortBy: AsteroidsSortBy) => {
            updateQueryString({ sortBy });
        },
        [updateQueryString]
    )

    const updateSortOrder = useCallback(
        (sortOrder: SortOrder) => {
            updateQueryString({ sortOrder });
        },
        [updateQueryString]
    )

    const updateOnlyFavs = useCallback(
        (onlyFavs: boolean) => {
            updateQueryString({ onlyFavs, page: DEFAULT_PAGE });
        },
        [updateQueryString]
    )

    const updateIsHazardous = useCallback(
        (isHazardous: boolean) => {
            updateQueryString({ isHazardous, page: DEFAULT_PAGE });
        },
        [updateQueryString]
    )

    const cleanFilters = useCallback(() => {
        updateQueryString({
            startDate: DEFAULT_START_DATE,
            endDate: DEFAULT_END_DATE,
            rowsPerPage: DEFAULT_ROWS_PER_PAGE,
            page: DEFAULT_PAGE,
            sortBy: DEFAULT_SORT_BY,
            sortOrder: DEFAULT_SORT_ORDER,
            onlyFavs: false,
            isHazardous: false,
        }); 
    }, [updateQueryString]);

    const dateRangeError = useMemo(() => {
        if(new Date(startDateParam || DEFAULT_START_DATE) > new Date(endDateParam || DEFAULT_END_DATE)){
            return "The start date cannot be greater than the end date";
        }
        // If the start date is greater than the current date, return true
        if(new Date(startDateParam || DEFAULT_START_DATE) > new Date()){
            return "The start date cannot be greater than the current date";
        }

       // NASA API only allows to search for 7 days at a time
       const startDate = new Date(startDateParam || DEFAULT_START_DATE);
       const endDate = new Date(endDateParam || DEFAULT_END_DATE);
       const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
       return diffDays > 7 ? "NASA API only allows to search for 7 days at a time" : false;
    }, [startDateParam, endDateParam]);

    return {
        startDate,
        endDate,
        rowsPerPage,
        page,
        sortBy,
        sortOrder,
        onlyFavs,
        isHazardous,
        updateStartDate,
        updateEndDate,
        updateRowsPerPage,
        updatePage,
        updateSortBy,
        updateSortOrder,
        updateOnlyFavs,
        updateIsHazardous,
        dateRangeError,
        cleanFilters
    }
}