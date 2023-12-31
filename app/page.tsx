import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import SearchBar from "@/components/SearchBar";
import { getAllProducts } from "@/lib/actions";
import Image from "next/image";

export default async function Home() {
	const allProducts = await getAllProducts();

	return (
		<>
			<section className="px-6 md:px-20 2xl:py-24 py-10 relative z-30">
				<div className="flex max-xl:flex-col gap-16">
					<div className="flex flex-col justify-center">
						<p className="small-text">
							Smart Shopping Starts Here:
							<Image
								src="/assets/icons/arrow-right.svg"
								alt="arrow-right"
								width={16}
								height={16}
							/>
						</p>
						<h1 className="head-text">
							Unleash the power of{" "}
							<span className="text-primary">SmartyShop</span>
						</h1>

						<p className="mt-6 text-gray-200">
							Powerful, self-serve product and growth analytics to help you
							convert, engage, and retain more.
						</p>
						<SearchBar />
					</div>

					<HeroCarousel />
				</div>
			</section>

			<section className="trending-section relative z-30">
				<h2 className="text-primary text-[32px] font-semibold">Trending</h2>
				<div className="flex flex-wrap gap-x-8 gap-y-16 text-gray-300 justify-center">
					{allProducts?.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
					{!allProducts?.length && (
						<p className="sm:text-3xl">Nothing to See here :) Add a product</p>
					)}
				</div>
			</section>
		</>
	);
}
