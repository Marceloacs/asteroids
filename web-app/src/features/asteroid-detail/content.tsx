import { Button } from "@/components/ui/button";
import {
  DialogFooter
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useGetAsteroidDetailOperation } from "@/operations/asteroids";
import { AlertTriangleIcon } from "lucide-react";
import Link from "next/link";
interface Props {
  id: string;
  date: string;
}

const AsteroidDetailContent = ({ id, date }: Props) => {
  const { data, isLoading, error } = useGetAsteroidDetailOperation({
    id,
    date,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {error?.message}</div>;
  }

  return (
    <>
      <div className="py-4">
        <Table>
          <TableBody>
            <TableRow>
              <TableCell className="text-right font-bold text-sm w-2/5">
                Name:
              </TableCell>
              <TableCell className="text-sm">{data.detail.name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right font-bold text-sm">
                Diameter aprox.:
              </TableCell>
              <TableCell className="text-sm">
                {data.detail.diameter} meters
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right font-bold text-sm">
                Velocity:
              </TableCell>
              <TableCell className="text-sm">
                {data.detail.velocity} km/h
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right font-bold text-sm">
                Absolute Magnitude:
              </TableCell>
              <TableCell className="text-sm">
                {data.detail.absoluteMagnitudeH}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right font-bold text-sm">
                Is Sentry Object:
              </TableCell>
              <TableCell className="text-sm">
                {data.detail.isSentryObject ? "Yes" : "No"}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="text-right font-bold text-sm">
                Is Hazardous:
              </TableCell>
              <TableCell className="text-sm">
                <span
                  className={`${
                    data.detail.isHazardous ? "text-red-500" : "text-green-500"
                  } flex items-center gap-2`}
                >
                  <span>{data.detail.isHazardous ? "Yes" : "No"}</span>
                  {data.detail.isHazardous && (
                    <AlertTriangleIcon className="w-4 h-4" />
                  )}
                </span>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <DialogFooter>
          <Button variant="link">
            <Link href={data.detail.link} target="_blank">
              See more
            </Link>
          </Button>
        </DialogFooter>
      </div>
    </>
  );
};

export default AsteroidDetailContent;
