import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import AsteroidDetail from "@/features/asteroid-detail";
import useAuth from "@/hooks/use-auth";
import { useUserAsteroids } from "@/hooks/use-user-asteroids";
import { Asteroid } from "asteroids-schema";
import { AlertTriangle, Eye, Star } from "lucide-react";
import { useCallback } from "react";

const AsteroidsTableItem = ({ asteroid }: { asteroid: Asteroid }) => {
  const { isAuthenticated } = useAuth();
  const { addFavoriteAsteroid, removeFavoriteAsteroid } = useUserAsteroids(); 
  const { date, name, diameter, isHazardous, id, isFavorite } = asteroid;
  const formatedDate = Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

  const toggleFavorite = useCallback(() => {
    if (isFavorite) {
      removeFavoriteAsteroid(id);
    } else {
      addFavoriteAsteroid(id);
    }
  }, [addFavoriteAsteroid, removeFavoriteAsteroid, id, isFavorite]);  

  return (
    <TableRow>
      {isAuthenticated && (
        <TableCell>
          <Button variant="ghost" size="icon" onClick={toggleFavorite}>
            <Star className={isFavorite ? "text-yellow-500" : "text-gray-500"} strokeWidth={2} />
          </Button>
        </TableCell>
      )}
      <TableCell className="font-medium">{name}</TableCell>
      <TableCell>{formatedDate}</TableCell>
      <TableCell>{diameter}m.</TableCell>
      <TableCell>
        <span className="flex flex-row items-center gap-2">
          <span>{isHazardous ? "Yes" : "No"}</span>
          {isHazardous && <AlertTriangle className="w-4 h-4 text-red-500" />}
        </span>
      </TableCell>
      <TableCell>
        <AsteroidDetail id={id} date={date}>
          <Button variant="ghost" size="icon">
            <Eye />
          </Button>
        </AsteroidDetail>
      </TableCell>
    </TableRow>
  );
};

export default AsteroidsTableItem;
