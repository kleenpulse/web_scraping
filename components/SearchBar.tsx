"use client";

import React, { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import { scrapeAndStoreProducts } from "@/lib/actions";

const isValidAmazonLink = (url: string) => {
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
};
const SearchBar = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const isValidLink = isValidAmazonLink(searchTerm);

		if (!isValidLink) return alert("Please enter a valid Amazon link");

		try {
			setIsLoading(true);

			// Scrape the product page
			const product = await scrapeAndStoreProducts(searchTerm);
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<form
			className="flex flex-col sm:flex-row gap-4 mt-12 items-center"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				placeholder="Enter product link....."
				value={searchTerm}
				className="flex-1 min-w-[200px] w-full p-3 border border-primary/80 rounded-lg shadow-xs text-base text-white focus:outline-none bg-transparent"
				onChange={(e) => setSearchTerm(e.target.value.toLowerCase().trim())}
			/>
			<button
				disabled={searchTerm === "" || isLoading}
				type="submit"
				className="bg-transparent border-primary/80 border  rounded-lg shadow-xs px-5 py-3 text-primary text-base font-semibold hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 transition-all duration-700 relative"
			>
				{isLoading ? "Searching..." : "Search"}
				{isLoading && (
					<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 !opacity-100 z-30">
						<LoadingSpinner />
					</div>
				)}
			</button>
		</form>
	);
};

export default SearchBar;
