"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import SignIn from "@/features/sign-in";
import useAuth from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { AsteroidsSortBy } from "asteroids-schema";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect } from "react";
import useAsteroidsFilters from "../hooks/use-filters";

const AsteroidsFilters = () => {
  const {
    startDate,
    endDate,
    sortBy,
    sortOrder,
    onlyFavs,
    isHazardous,
    updateStartDate,
    updateEndDate,
    updateSortBy,
    updateSortOrder,
    updateOnlyFavs,
    updateIsHazardous,
    dateRangeError,
    cleanFilters,
  } = useAsteroidsFilters();

  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (dateRangeError) {
      toast({
        title: "Error",
        description: dateRangeError,
        variant: "destructive",
      });
    }
  }, [dateRangeError, toast]);
  return (
    <div className="flex flex-col gap-2 items-start justify-start">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-row gap-2 w-full sm:w-auto">
          <div className="grid max-w-sm items-center gap-1.5">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => updateStartDate(e.target.value)}
            />
          </div>
          <div className="grid max-w-sm items-center gap-1.5">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => updateEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2 w-full sm:w-auto">
          <Label htmlFor="sortBy">Sort by</Label>
          <div className="flex flex-row gap-2 items-center justify-start">
            <Select
              value={sortBy}
              onValueChange={(value) => updateSortBy(value as AsteroidsSortBy)}
            >
              <SelectTrigger className="w-[150px] h-10">
                <SelectValue placeholder={`${sortBy} ${sortOrder}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="diameter">Diameter</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              onClick={() =>
                updateSortOrder(sortOrder === "asc" ? "desc" : "asc")
              }
            >
              {sortOrder === "asc" ? (
                <ChevronUpIcon className="h-4 w-4" />
              ) : (
                <ChevronDownIcon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        <div className="flex flex-row gap-2 items-center justify-start">
          <div className="flex flex-col gap-2 items-start justify-start">
            <Label htmlFor="onlyFavs">Only your favorites</Label>
            {isAuthenticated && (
              <Switch
                checked={onlyFavs}
                onCheckedChange={() => updateOnlyFavs(!onlyFavs)}
                className="bg-gray-500"
              />
            )}
            {!isAuthenticated && (
              <SignIn onSuccess={() => updateOnlyFavs(true)}>
                <Switch checked={false} className="bg-gray-500" />
              </SignIn>
            )}
          </div>
          <div className="flex flex-col gap-2 items-start justify-start">
            <Label>Only hazardous</Label>
            <Switch
              checked={isHazardous}
              onCheckedChange={() => updateIsHazardous(!isHazardous)}
              className="bg-gray-500"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-end justify-end">
        <Button onClick={cleanFilters} variant="ghost">
          Clean filters
        </Button>
      </div>
    </div>
  );
};

export default AsteroidsFilters;
