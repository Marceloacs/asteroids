import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useAsteroids from "../hooks/use-asteroids";
import AsteroidsTableItem from "./table-item";
import { Label } from "@radix-ui/react-label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import useAsteroidsFilters from "../hooks/use-filters";
import useAuth from "@/hooks/use-auth";

const AsteroidsTable = () => {
  const { isAuthenticated } = useAuth();
  const { asteroids, total, pages } = useAsteroids();
  const { rowsPerPage, page, updateRowsPerPage, updatePage } =
    useAsteroidsFilters();

  const noResults = total === 0;
  const noResultsPlaceholder = noResults && (
    <TableRow>
      <TableCell colSpan={6} className="text-center">
        <p className="text-sm text-gray-500">No data found by your filters</p>
      </TableCell>
    </TableRow>
  );

  return (
    <div className="w-full bg-white rounded-lg shadow-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {isAuthenticated && (
              <TableHead className="font-bold">Favorite</TableHead>
            )}
            <TableHead className="w-[150px] font-bold">Name</TableHead>
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Dimensions</TableHead>
            <TableHead className="font-bold">Hazardous</TableHead>
            <TableHead className="font-bold">See detail</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {asteroids.map((asteroid) => (
            <AsteroidsTableItem key={asteroid.id} asteroid={asteroid} />
          ))}
          {noResultsPlaceholder}
        </TableBody>
        {!noResults && (
          <TableFooter>
            <TableRow>
              <TableCell className="text-right" colSpan={6}>
                <div className="flex flex-row justify-between">
                  <p className="text-sm text-gray-500 font-bold">
                    {total} found
                  </p>
                  <div className="flex flex-row gap-2 w-full sm:w-auto items-center justify-end">
                    <div className="grid max-w-sm items-center gap-1.5">
                      <Label htmlFor="rowsPerPage">Rows per page</Label>
                      <Select
                        value={rowsPerPage.toString()}
                        onValueChange={(value) =>
                          updateRowsPerPage(Number(value))
                        }
                      >
                        <SelectTrigger className="w-30 h-10">
                          <SelectValue placeholder="Select a number" />
                        </SelectTrigger>
                        <SelectContent className="w-30">
                          <SelectItem value="5">5</SelectItem>
                          <SelectItem value="10">10</SelectItem>
                          <SelectItem value="20">20</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid max-w-sm items-center gap-1.5">
                      <Label htmlFor="page">Page</Label>
                      <div className="flex flex-row gap-2 items-center justify-center">
                        <Button
                          variant="outline"
                          onClick={() => updatePage(page - 1)}
                          className="w-10 h-10"
                        >
                          <ChevronLeftIcon className="h-4 w-4" />
                        </Button>
                        <span>{page}</span>
                        <Button
                          variant="outline"
                          onClick={() => updatePage(page + 1)}
                          disabled={page === pages}
                          className="w-10 h-10"
                        >
                          <ChevronRightIcon className="h-4 w-4" />
                        </Button>
                        <span>de {pages}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  );
};

export default AsteroidsTable;
