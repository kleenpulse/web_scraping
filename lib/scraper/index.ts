"use server";

import axios from "axios";
import * as cheerio from "cheerio";
import { extractCurrency, extractDescription, extractPrice } from "../utils";

export async function scrapeAmazonProduct(url: string) {
	if (!url) return;

	// curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_fcdc379a-zone-unblocker:v1dx83te9bl7 -k https://lumtest.com/myip.json

	const username = String(process.env.BRIGHT_DATA_USERNAME);
	const password = String(process.env.BRIGHT_DATA_PASSWORD);
	const port = 22225;
	const session_id = (10000000 + Math.random()) | 0;
	const options = {
		auth: {
			username: `${username}-session-${session_id}`,
			password,
		},
		host: "brd.superproxy.io",
		port,
		rejectUnauthorized: false,
	};

	try {
		const res = await axios.get(url, options);
		const $ = cheerio.load(res.data);

		// Extract the product title
		const title = $("#productTitle").text().trim();
		const originalPrice = extractPrice(
			$("#priceblock_ourprice"),
			$(".a-price.a-text-price span.a-offscreen"),
			$("#listPrice"),
			$("#priceblock_dealprice"),
			$(".a-size-base.a-color-price")
		);
		const currPrice = extractPrice(
			$(".priceToPay span.a-price-whole"),
			$("a.size.base.a-color-price"),
			$(".a-button-selected .a-color-base")
		);

		const outOfStock =
			$("#availability span").text().trim().toLowerCase() ===
			"currently unavailable";

		const images =
			$("#imgBlkFront").attr("data-a-dynamic-image") ||
			$("#landingImage").attr("data-a-dynamic-image") ||
			"{}";

		const imageUrls = Object.keys(JSON.parse(images));

		const currency = extractCurrency($(".a-price-symbol"));
		const discountRate = $(".savingsPercentage")
			.text()
			.trim()
			.replace(/[-%]/g, "");
		const description = extractDescription($);

		const data = {
			url,
			currency: currency || "$",
			image: imageUrls[0],
			title,
			currPrice: Number(currPrice) || Number(originalPrice),
			originalPrice: Number(originalPrice) || Number(currPrice),
			discountRate: Number(discountRate),
			priceHistory: [],
			isOutOfStock: outOfStock,
			reviewsCount: 100,
			stars: 5,
			description,
			category:
				description.split(" ").slice(0, 2).join(" ").replace("&", " ") ||
				"Category",
			lowestPrice: Number(currPrice) || Number(originalPrice),
			highestPrice: Number(originalPrice) || Number(currPrice),
			averagePrice: Number(currPrice) || Number(originalPrice),
		};

		return data;
	} catch (error: any) {
		throw new Error(`Failed to scrape product: ${error.message}`);
	}
}
