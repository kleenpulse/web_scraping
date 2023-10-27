import Image from "next/image";
import React from "react";

interface Props {
	title: string;
	iconSrc: string;
	value: string;
	borderColor: string;
}

const PriceInfoCard = ({ title, iconSrc, value, borderColor }: Props) => {
	return (
		<div className={`price-info_card ${borderColor}`}>
			<p className="text-base font-medium">{title}</p>

			<div className="flex gap-1">
				<Image src={iconSrc} alt={title} width={24} height={24} />

				<p className="text-2xl font-bold text-primary">{value}</p>
			</div>
		</div>
	);
};

export default PriceInfoCard;
