import { Card, Image, ScrollShadow } from "@nextui-org/react";
import { games } from "@/config/games";
import { Button, Chip } from "@nextui-org/react";

export default function PricingPage() {
	return (
		// <ScrollShadow hideScrollBar className="h-[550px]">
		<div className="mx-auto grid grid-cols-1 sm:grid-cols-4 max-w-4xl">
			{
				games.map((game, index) =>
					<div className="col-span-1" key={index}>
						<Card className="m-5 sm:m-2 h-auto">
							<Image
								// isZoomed
								removeWrapper
								alt={game.title}
								className="z-0 w-full h-full object-fill relative"
								src={game.imageUrl}
							/>
							<Button className="absolute bottom-0 left-[50%] translate-x-[-50%] w-full backdrop-blur-sm bg-black/50 text-white text-2xl sm:text-medium py-10 sm:py-0 rounded-t-none">
								Buy Now
							</Button>
							<Chip variant="shadow" className="absolute top-0 -right-0 translate-x-[35%] translate-y-[35%] sm:translate-x-[30%] sm:translate-y-[30%] py-7 px-20 sm:px-10 sm:py-4 rounded-none rotate-45 text-white backdrop-blur-sm bg-red-600/100 border-2 border-yellow-400 shadow-yellow-400 font-serif text-5xl sm:text-xl">${game.price}</Chip>
						</Card>
					</div>
				)}
		</div>
		// </ScrollShadow>
	);
}
