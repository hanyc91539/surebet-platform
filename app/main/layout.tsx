import Sidebar from "@/components/sidebar";
import { Divider } from "@nextui-org/react";


export default function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section className="flex h-[560px]">
			<Sidebar />
			<Divider orientation="vertical" />

			<div className="">
				{children}
			</div>
		</section>
	);
}
