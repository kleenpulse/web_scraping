import Product from "@/lib/models/product.model";
import { connectToDB } from "@/lib/mongoose";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";
import { scrapeAmazonProduct } from "@/lib/scraper";
import {
	getAveragePrice,
	getEmailNotifType,
	getHighestPrice,
	getLowestPrice,
} from "@/lib/utils";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		connectToDB();

		const products = await Product.find({});

		if (!products.length) {
			throw new Error("No products found");
		}

		// Scrape the products and update the database

		const updatedProducts = await Promise.all(
			products.map(async (currentProduct) => {
				const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

				if (!scrapedProduct) throw new Error("No product found");

				const updatedPriceHistory = [
					...currentProduct.priceHistory,
					{ price: scrapedProduct.currPrice },
				];

				const product = {
					...scrapedProduct,
					priceHistory: updatedPriceHistory,
					lowestPrice: getLowestPrice(updatedPriceHistory),
					highestPrice: getHighestPrice(updatedPriceHistory),
					averagePrice: getAveragePrice(updatedPriceHistory),
				};

				const updatedProduct = await Product.findOneAndUpdate(
					{ url: scrapedProduct.url },
					product
				);

				// Check each product status and send an email notification
				const emailNotifType = getEmailNotifType(
					scrapedProduct,
					currentProduct
				);

				if (emailNotifType && updatedProduct.users.length > 0) {
					const productInfo = {
						title: updatedProduct.title,
						url: updatedProduct.url,
						image: updatedProduct.image,
					};

					const emailContent = await generateEmailBody(
						productInfo,
						emailNotifType
					);

					const userEmails = updatedProduct.users.map(
						(user: any) => user.email
					);

					await sendEmail(emailContent, userEmails);
				}

				return updatedProduct;
			})
		);

		return NextResponse.json({ message: "ok", data: updatedProducts });
	} catch (error) {
		throw new Error(`Something went wrong with the cron job: ${error}`);
	}
}
