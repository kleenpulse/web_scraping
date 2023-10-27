import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.scss";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
	title: "Web Scraper",
	description:
		"Easily Track product prices and save time and money on your online shopping",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={`${inter.className} ${spaceGrotesk.className} `}>
				<main className="max-w-[1440px] mx-auto w-full ">
					<Navbar />

					{children}
				</main>
			</body>
		</html>
	);
}
