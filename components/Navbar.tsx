import Image from "next/image";
import Link from "next/link";
import React from "react";

const navIcons = [
	// {
	// 	src: "/assets/icons/search.svg",
	// 	alt: "search",
	// 	id: 1,
	// },
	{
		src: "/assets/icons/black-heart.svg",
		alt: "heart",
		id: 2,
	},
	{
		src: "/assets/icons/user.svg",
		alt: "user",
		id: 3,
	},
];

export const Navbar = () => {
	return (
		<header className="w-full relative z-30 ">
			<nav className="flex justify-between items-center px-6 md:px-20 py-4 w-full ">
				<Link href="/" className="flex items-center gap-1 ">
					<Image
						src="/assets/icons/logo.svg"
						width={27}
						height={27}
						alt="logo"
					/>
					<p className="font-spaceGrotesk text-[21px] text-gray-300 font-bold">
						Smarty<span className="text-primary">Shop</span>
					</p>
				</Link>
				<div className="flex items-center gap-5">
					{navIcons.map((icon) => (
						<Image
							key={icon.id}
							src={icon.src}
							width={27}
							height={27}
							alt={icon.alt}
							className="object-contain "
						/>
					))}
				</div>
			</nav>
		</header>
	);
};
