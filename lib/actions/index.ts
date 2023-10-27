"use server";
import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProducts(productUrl: string) {
	if (!productUrl) return;

	try {
		connectToDB();
		const scrapedProduct = await scrapeAmazonProduct(productUrl);

		if (!scrapedProduct) return;

		let product = scrapedProduct;

		const extistingProduct = await Product.findOne({
			url: scrapedProduct.productUrl,
		});

		if (extistingProduct) {
			const updatedPriceHistory: any = [
				...extistingProduct.priceHistory,
				{ price: scrapedProduct.currPrice },
			];

			product = {
				...scrapedProduct,
				priceHistory: updatedPriceHistory,
				lowestPrice: getLowestPrice(updatedPriceHistory),
				highestPrice: getHighestPrice(updatedPriceHistory),
				// @ts-ignore
				averagePrice: getAveragePrice(updatedPriceHistory),
			};
		}

		const newProduct = await Product.findOneAndUpdate(
			{ url: scrapedProduct.productUrl },
			product,
			{ upsert: true, new: true }
		);

		revalidatePath(`/product/${newProduct._id}`);
	} catch (error: any) {
		throw new Error(`Failed to create/update product: ${error.message}`);
	}
}

export async function getProductById(productId: string) {
	try {
		connectToDB();

		const product = await Product.findOne({ _id: productId });

		if (!product) return null;

		return product;
	} catch (error: any) {
		console.log(error);
		throw new Error(`Failed to get product: ${error.message}`);
	}
}

export async function getAllProducts() {
	try {
		connectToDB();

		const products = (await Product.find()).reverse();

		return products;
	} catch (error) {
		console.log(error);
	}
}

export async function getSimilarProducts(productId: string) {
	try {
		connectToDB();

		const currentProduct = await Product.findById(productId);

		if (!currentProduct) return null;

		const similarProducts = await Product.find({
			_id: { $ne: productId },
		}).limit(4);

		return similarProducts;
	} catch (error) {
		console.log(error);
	}
}
