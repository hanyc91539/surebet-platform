import "@/styles/globals.css";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Providers } from "./providers";
import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Viewport } from "next";
import { getServerSession } from "next-auth";
import SessionProvider from "@/utils/SessionProvider";
import toast, { Toaster } from 'react-hot-toast';
import { SUCCESS } from "@/config/toast";

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	icons: {
		icon: "/favicon.ico",
		shortcut: "/favicon-16x16.png",
		apple: "/apple-touch-icon.png",
	},
};

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

const notify = (handler: string = SUCCESS, message: string) => {
    if (handler == SUCCESS) {
        toast.success(message, {
            duration: 3000,
            position: 'top-right',
        });
    }
    else {
        toast.error(message, {
            duration: 3000,
            position: 'bottom-right',
        });
    }
}

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await getServerSession();
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body
				className={clsx(
					"min-h-screen bg-background font-sans antialiased",
					fontSans.variable
				)}
			>
				<SessionProvider session={session}>
					<Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
						<div className="relative flex flex-col">
							<Navbar />
							<main className="container mx-auto max-w-7xl pt-12 px-6 flex-grow">
								<Toaster />
								{children}
							</main>
							<footer className="w-full flex items-center justify-center py-10">
								<Link
									isExternal
									className="flex items-center gap-1 text-current"
									href="https://gestioneslatinoamerica.com/"
									title="nextui.org homepage"
								>
									<span className="text-default-600">Powered by</span>
									<p className="text-primary">Gestiones Latin America</p>
								</Link>
							</footer>
						</div>
					</Providers>
				</SessionProvider>
			</body>
		</html>
	);
}

