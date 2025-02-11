import AsteroidsDashboard from "@/features/asteroids-dashboard";
import { Suspense } from "react";

export default function Home() {
  return (
    <main className="container mx-auto flex flex-col gap-4 px-2 sm:px-4">
      <h1 className="text-2xl font-bold">Asteroids Index</h1>
      <Suspense>
        <AsteroidsDashboard />
      </Suspense>
    </main>
  );
}
