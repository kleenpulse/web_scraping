import Description from "@/components/Description";
import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";
import ProductCard from "@/components/ProductCard";
import { getProductById, getSimilarProducts } from "@/lib/actions";
import { formatNumber } from "@/lib/utils";
import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
	params: {
		id: string;
	};
};
const ProductDetails = async ({ params: { id } }: Props) => {
	const product = (await getProductById(id)) as Product;

	if (!product) redirect("/");

	const similarProducts = await getSimilarProducts(id);

	return (
		<div className="relative z-30 text-white flex flex-col gap-16 flex-wrap sm:px-6 md:px-20 lg:py-16 xl:py-24 py-8    ">
			<div className="flex flex-col xl:gap-28 gap-20 xl:flex-row items-center justify-center">
				<div className="flex w-full xl:w-1/2 justify-center  xl:pb-16 ">
					<div className="xl:flex-grow  max-w-full   rounded-[17px] bg-white">
						<Image
							src={product.image}
							alt={product.title}
							width={680}
							height={400}
							className="rounded-xl md:rounded-2xl max-xl:max-h-[600px] max-xl:object-contain max-sm:w-full max-sm:min-w-[300px]"
						/>
					</div>
				</div>

				<div className="flex flex-col sm:flex-1 px-2 sm:px-0 ">
					<div className="flex justify-between items-start gap-5 flex-wrap pb-6 w-full">
						<div className="flex flex-col gap-3">
							<p className="sm:text-2xl font-medium text-gray-200">
								{product.title}
							</p>
						</div>

						<Link
							href={product.url}
							target="_blank"
							className="text-base text-primary opacity-70"
						>
							Visit Product
						</Link>
					</div>
					<div className="flex items-center gap-3">
						<div className="product-hearts">
							<Image
								src="/assets/icons/red-heart.svg"
								alt="heart"
								width={20}
								height={20}
							/>
							<p className="text-base font-medium text-primary">
								{product.reviewsCount}
							</p>
						</div>

						<div className="p-[9px] bg-primary/20 rounded-10">
							<Image
								src="/assets/icons/bookmark.svg"
								width={20}
								height={20}
								alt="bookmark"
							/>
						</div>

						<div className="p-[9px] bg-primary/20 rounded-10">
							<Image
								src="/assets/icons/share.svg"
								width={20}
								height={20}
								alt="bookmark"
							/>
						</div>
					</div>
					<div className="product-info mt-6">
						<div className="flex flex-col gap-2">
							<p className="sm:text-[34px] text-2xl font-bold text-primary/[0.8]">
								{product.currency} {formatNumber(product.currPrice)}
							</p>
							<p className=" sm:text-2xl text-lg text-primary-orange line-through opacity-70">
								{product.currency} {formatNumber(product.originalPrice)}
							</p>
						</div>
						<div className="flex flex-col gap-4">
							<div className="flex gap-3">
								<div className="product-stars">
									<Image
										src="/assets/icons/star.svg"
										alt="star"
										height={16}
										width={16}
									/>
									<p className="text-sm font-medium text-primary/80">
										{product.stars || "69"}
									</p>
								</div>

								<div className="product-reviews">
									<Image
										src={"/assets/icons/comment.svg"}
										alt="comment"
										height={16}
										width={16}
									/>
									<p className="text-sm font-medium text-primary/90">
										{product.reviewsCount} Reviews
									</p>
								</div>
							</div>
							<p className="text-sm text-primary-orange">
								<span>93% </span> of buyers have recommended this.
							</p>
						</div>
					</div>
					<div className="my-7 flex flex-col gap-5 w-full justify-center items-center">
						<div className="sm:flex gap-5 sm:flex-wrap grid grid-cols-2 w-full justify-center  place-content-center ">
							<PriceInfoCard
								title="Current Price"
								iconSrc="/assets/icons/price-tag.svg"
								value={`${product.currency} ${formatNumber(product.currPrice)}`}
								borderColor="border-blue-300"
							/>

							<PriceInfoCard
								title="Average Price"
								iconSrc="/assets/icons/chart.svg"
								value={`${product.currency} ${formatNumber(
									product.averagePrice
								)}`}
								borderColor="border-primary-orange"
							/>

							<PriceInfoCard
								title="Highest Price"
								iconSrc="/assets/icons/arrow-up.svg"
								value={`${product.currency} ${formatNumber(
									product.highestPrice
								)}`}
								borderColor="border-red-500"
							/>

							<PriceInfoCard
								title="Lowest Price"
								iconSrc="/assets/icons/arrow-down.svg"
								value={`${product.currency} ${formatNumber(
									product.lowestPrice
								)}`}
								borderColor="border-green-400"
							/>
						</div>
						<Modal productId={id} />
					</div>
				</div>
			</div>
			<div className="flex flex-col gap-16  w-full ">
				<div className="flex flex-col gap-5 w-full">
					<h3 className="text-xl sm:text-2xl xl:text-3xl font-medium pl-2">
						Product Description
					</h3>
					<div className="h-full ">
						<Description desc={product.description} />
					</div>

					<Link
						href="/"
						className="btn w-fit flex items-center mx-auto justify-center gap-3 min-w-[200px] sm:min-w-[250px] "
					>
						<Image
							src="/assets/icons/bag.svg"
							alt="bag"
							width={24}
							height={24}
						/>
						<span className="text-base sm:text-xl text-primary">Buy Now</span>
					</Link>
				</div>
			</div>

			{similarProducts && similarProducts?.length > 0 && (
				<div className="py-14 flex flex-col gap-2 w-full px-2">
					<p className="text-xl font-medium xl:text-3xl">Similar Products</p>

					<div className="flex flex-wrap gap-10 mt-7 w-full">
						{similarProducts.map((product) => (
							<ProductCard key={product._id} product={product} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
