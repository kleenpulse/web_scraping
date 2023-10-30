"use client";

import React, { useEffect, useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { scrapeAndStoreProducts } from "@/lib/actions";

const isValidAmazonLink = (url: string) => {
	if (url.includes("amazon") && url.includes("://")) {
		try {
			const parsedURL = new URL(url);
			const hostname = parsedURL.hostname;

			if (
				hostname.includes("amazon.com") ||
				hostname.includes("amazon.") ||
				hostname.endsWith("amazon")
			) {
				return true;
			}
		} catch (error) {
			console.log(error);
			return false;
		}
	} else {
		return false;
	}
};

const MAX_TRIES = 15;
const SearchBar = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [image, setImage] = useState<string | undefined>("");
	const [err, setErr] = useState("");
	const [tries, setTries] = useState(0);

	const btnRef = useRef<HTMLButtonElement>(null);
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValidLink = isValidAmazonLink(searchTerm);

		if (!isValidLink) return alert("Please enter a valid Amazon link");
		if (tries === MAX_TRIES) {
			setIsLoading(false);
			return;
		}
		try {
			setIsLoading(true);
			setTries((prev) => prev + 1);

			// Scrape the product page
			const product = await scrapeAndStoreProducts(searchTerm);
			console.log(product);
			setImage(product?.isImage);
		} catch (error) {
			setErr(error as string);
		} finally {
			setIsLoading(false);
		}
	};

	console.log(image);
	// console.log(err);

	useEffect(() => {
		if (!isValidAmazonLink(searchTerm)) return;
		let intervalId: any = null;
		if (tries === MAX_TRIES) {
			setIsLoading(false);
			window.clearInterval(intervalId);
			setTimeout(() => {
				setTries(0);
			}, 1000);
			return;
		}

		if (image?.includes("amazon") || image?.includes("media")) {
			setSearchTerm("");
			setTries(0);
			setTimeout(() => {
				setImage("");
			}, 1000);
			return;
		}
		if (isValidAmazonLink(searchTerm) && tries < MAX_TRIES) {
			btnRef.current?.click();
			intervalId = setInterval(() => {
				return btnRef.current?.click();
			}, 3000);
			// return;
		}
		if (tries === MAX_TRIES) {
			setIsLoading(false);
			window.clearInterval(intervalId);
			setTimeout(() => {
				setTries(0);
			}, 1000);
			return;
		}
		return () => {
			if (image?.includes("https://")) {
				window.clearInterval(intervalId);
				setSearchTerm("");
				setTries(0);
				setTimeout(() => {
					setImage("");
				}, 1000);
			}
		};
	}, [image, err, tries]);

	return (
		<>
			<form
				className="flex flex-col sm:flex-row gap-4 mt-12 items-center"
				onSubmit={handleSubmit}
			>
				<input
					type="text"
					placeholder="Amazon product link....."
					value={searchTerm}
					className="flex-1 min-w-[200px] w-full p-3 border border-primary/80 rounded-lg shadow-xs text-base text-white focus:outline-none bg-transparent"
					onChange={(e) => setSearchTerm(e.target.value.toLowerCase().trim())}
				/>
				{tries === MAX_TRIES && (
					<p className="text-gray-200 sm:hidden">something went wrong</p>
				)}
				<button
					ref={btnRef}
					disabled={searchTerm === "" || isLoading}
					type="submit"
					className="bg-primary sm:bg-transparent border-primary/80 border  rounded-lg shadow-xs px-5 py-3 text-white sm:text-primary text-base font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-700 relative"
				>
					{isLoading ? "Searching..." : "Search"}
					{isLoading && (
						<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !opacity-100 z-30">
							<LoadingSpinner />
						</div>
					)}
				</button>
			</form>
			{tries === MAX_TRIES && (
				<p className="text-gray-200 mt-2 hidden sm:block">
					invalid product link or something went wrong please try again
				</p>
			)}
		</>
	);
};

export default SearchBar;
