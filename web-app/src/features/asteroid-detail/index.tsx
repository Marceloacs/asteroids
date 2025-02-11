import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { JSX } from "react";
import AsteroidDetailContent from "./content";

interface Props {
  id: string;
  date: string;
  children: JSX.Element;
}

const AsteroidDetail = ({ id, date, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Asteroid Detail</DialogTitle>
          <DialogDescription>
            Detailed information about this asteroid.
          </DialogDescription>
        </DialogHeader> 
        <AsteroidDetailContent id={id} date={date} />
      </DialogContent>
    </Dialog>
  );
};

export default AsteroidDetail;
