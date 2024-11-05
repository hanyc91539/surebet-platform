import { Card, CardHeader, Image } from "@nextui-org/react";
import Link from "next/link";
import { Games } from "@/types";

const GameCard: React.FC<Games> = ({ games }) => {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 max-w-4xl">
        {
          games.map((game, index) =>
            <Link href={`/main/${game.name}`} className="col-span-1" key={index}>
              <Card key={index} className="h-auto">
                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                  <p className="text-tiny uppercase font-bold">Gestiones</p>
                  <h4 className="font-medium text-large">Auto betting</h4>
                </CardHeader>
                <Image
                  isZoomed
                  removeWrapper
                  alt={game.title}
                  className="z-0 w-full h-full object-cover"
                  src={game.imageUrl}
                />
              </Card>
            </Link>
          )}
      </div>
    </>
  );
}

export default GameCard
