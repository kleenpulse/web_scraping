import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
	product: Product;
};

const ProductCard = ({ product }: Props) => {
	return (
		<Link href={`/products/${product._id}`} className="product-card">
			<div className="product-card_img-container bg-white">
				<Image
					src={product.image}
					alt={product.title}
					width={200}
					height={200}
					className="product-card_img"
				/>
			</div>

			<div className="flex flex-col gap-3">
				<h3 className="text-gray-200 text-xl leading-6 font-semibold truncate">
					{product.title}
				</h3>

				<div className="flex justify-between">
					<p className="text-primary/80 text-lg capitalize">
						{product.category}
					</p>

					<p className="text-primary font-medium">
						<span>{product?.currency}</span>
						<span>{product?.currPrice}</span>
					</p>
				</div>
			</div>
		</Link>
	);
};

export default ProductCard;
