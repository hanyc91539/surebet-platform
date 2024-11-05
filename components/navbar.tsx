import {
	Navbar as NextUINavbar,
	NavbarContent,
	NavbarMenu,
	NavbarMenuToggle,
	NavbarBrand,
	NavbarItem,
	NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
	TwitterIcon,
	FacebookIcon,
	InstagramIcon,
	SkypeIcon,
	WhatsappIcon,
	DiscordIcon,
	TelegramIcon,
	LoginIcon,
} from "@/components/icons";

import { Logo } from "@/components/icons";
import { Divider } from "@nextui-org/react";
import Login from "./login";
import Register from "./register";
import { useSession } from "next-auth/react";
import Logout from "./logout";

export const Navbar = () => {
	return (
		<>
			<NextUINavbar maxWidth="xl" position="sticky">
				<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
					<NavbarBrand as="li" className="gap-3 max-w-fit">
						<NextLink className="flex justify-start items-center gap-1" href="/">
							<Logo />
							<p className="font-bold text-inherit">Gestiones Latam</p>
						</NextLink>
					</NavbarBrand>
					<ul className="hidden lg:flex gap-4 justify-start ml-2">
						{siteConfig.navItems.map((item) => (
							<NavbarItem key={item.href}>
								<NextLink
									className={clsx(
										linkStyles({ color: "foreground" }),
										"data-[active=true]:text-primary data-[active=true]:font-medium"
									)}
									color="foreground"
									href={item.href}
								>
									{item.label}
								</NextLink>
							</NavbarItem>
						))}
					</ul>
				</NavbarContent>

				<NavbarContent
					className="hidden sm:flex basis-1/5 sm:basis-full"
					justify="end"
				>
					<NavbarItem className="hidden sm:flex gap-3">
						{/* <Link isExternal href={siteConfig.links.twitter} aria-label="Twitter">
							<TwitterIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.facebook} aria-label="Facebook">
							<FacebookIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.instagram} aria-label="Instagram">
							<InstagramIcon className="text-default-500" />
						</Link> */}
						<Link isExternal href={siteConfig.links.whatsapp} aria-label="Whatsapp">
							<WhatsappIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.telegram} aria-label="Telegram">
							<TelegramIcon className="text-default-500" />
						</Link>
						{/* <Link isExternal href={siteConfig.links.discord} aria-label="Discord">
							<DiscordIcon className="text-default-500" />
						</Link>
						<Link isExternal href={siteConfig.links.skype} aria-label="Skype">
							<SkypeIcon className="text-default-500" />
						</Link> */}
						<ThemeSwitch />
					</NavbarItem>

					<NavbarItem className="hidden md:flex md: space-x-1">
						<Login />
						<Register />
						<Logout />
					</NavbarItem>

				</NavbarContent>

				<NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
					<Link isExternal href={siteConfig.links.whatsapp} aria-label="Whatsapp">
						<WhatsappIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
					<NavbarMenuToggle />
				</NavbarContent>
				<NavbarMenu>
					<div className="mx-4 mt-2 flex flex-col gap-2">
						{siteConfig.navMenuItems.map((item, index) => (
							<NavbarMenuItem key={`${item}-${index}`}>
								<Link
									color={
										index === 2
											? "primary"
											: index === siteConfig.navMenuItems.length - 1
												? "danger"
												: "foreground"
									}
									href="#"
									size="lg"
								>
									{item.label}
								</Link>
							</NavbarMenuItem>
						))}
					</div>
				</NavbarMenu>
			</NextUINavbar>
			{/* <Divider orientation="horizontal"></Divider> */}
		</>
	);
};
