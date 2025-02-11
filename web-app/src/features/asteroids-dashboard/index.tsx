'use client'

import AsteroidsFilters from "./components/filters";
import AsteroidsTable from "./components/table";
import useAsteroids from "./hooks/use-asteroids";

const AsteroidsDashboard = () => {

    const { isLoading, error } = useAsteroids();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-4">
            <AsteroidsFilters />
            <AsteroidsTable />
        </div>
    )
}

export default AsteroidsDashboard;