"use client";

import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";
import LoadingSpinner from "./LoadingSpinner";

const heroImages = [
	{ imgUrl: "/assets/images/hero-1.svg", alt: "smartwatch", id: 1 },
	{ imgUrl: "/assets/images/hero-2.svg", alt: "bag", id: 2 },
	{ imgUrl: "/assets/images/hero-3.svg", alt: "lamp", id: 3 },
	{ imgUrl: "/assets/images/hero-4.svg", alt: "air fryer", id: 4 },
	{ imgUrl: "/assets/images/hero-5.svg", alt: "chair", id: 5 },
];

const HeroCarousel = () => {
	const [isLoading, setIsLoading] = useState(true);
	return (
		<div className="relative sm:px-10 py-5 xl:pt-10 2xl:pt-20 max-w-[560px] h-[700px] max-sm:max-w-[400px] max-sm:h-[500px] w-full bg-transparent border border-primary/70 max-sm:scale-90 rounded-[30px] mx-auto select-none height-hero">
			<Carousel
				showThumbs={false}
				autoPlay
				infiniteLoop
				interval={3000}
				showArrows={false}
				showStatus={false}
				swipeable
				emulateTouch
			>
				{heroImages.map((image) => (
					<>
						<Image
							key={image.id}
							src={image.imgUrl}
							alt={image.alt}
							width={484}
							height={484}
							className="object-contain max-sm:max-w-[400px] max-sm:h-[400px] "
							onLoad={() => setIsLoading(false)}
						/>
						{isLoading && (
							<div className="flex items-center justify-center h-[484px] scale-150">
								<LoadingSpinner />
							</div>
						)}
					</>
				))}
			</Carousel>
			<Image
				src="assets/icons/hand-drawn-arrow.svg"
				alt="arrow"
				width={175}
				height={175}
				className="absolute bottom-0 -left-[15%] max-[1440px]:hidden"
			/>
		</div>
	);
};

export default HeroCarousel;
