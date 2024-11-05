import { games } from "@/config/games"
import Link from "next/link";
import { ScrollShadow, Avatar, Divider, Button } from "@nextui-org/react";
import { LogoutIcon } from "./icons";

const Sidebar = () => {
    return (
        <div className="flex flex-col space-y-9">
            <ScrollShadow hideScrollBar className="w-[200px] h-[600px] px-10">
                <ul className="list-disc text-default-500">

                    {
                        games.map((game, index) =>
                            <li className="py-2 hover:scale-110 ease-in-out duration-500" key={index}>
                                <Link href={`/main/${game.name}`}>
                                    {game.title}
                                </Link>
                            </li>
                        )}
                </ul>
            </ScrollShadow>
        </div>
    )
}

export default Sidebar;
