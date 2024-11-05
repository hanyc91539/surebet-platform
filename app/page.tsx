import { title, subtitle } from "@/components/primitives";
import GameCard from "@/components/ui/carousel";
import { games } from "@/config/games";

export default function Home() {
	return (
		<section className="flex flex-col items-center justify-center space-x-3 md:space-y-10">
			<div className="inline-block max-w-lg text-center justify-center">
				<h1 className={title()}>Make&nbsp;</h1>
				<h1 className={title({ color: "violet" })}>more profit&nbsp;</h1>
				<br />
				<h1 className={title()}>
					using this platform.
				</h1>
				<h2 className={subtitle({ class: "mt-4" })}>
					Enjoy sports betting on the go, from anywhere!
				</h2>
			</div>

			<div>
				<GameCard games={games} />
			</div>
		</section>
	);
}
