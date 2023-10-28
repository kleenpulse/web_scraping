"use client";

import React, { useState } from "react";

const Description = ({ desc }: { desc?: string }) => {
	const descText = desc?.split("\n");
	const [isShowMore, setIsShowMore] = useState(false);

	return (
		<>
			<div className="">
				<p className="pt-4 flex flex-col text-gray-400 px-2 sm:px-4 tracking-wider leading-6 sm:leading-8 xl:hidden">
					{!isShowMore && descText && descText?.length > 12
						? `${descText?.slice(0, 12)}...`
						: descText}
					<button
						className="text-primary font-semibold"
						type="button"
						onClick={() => setIsShowMore(!isShowMore)}
					>
						{isShowMore ? "Show Less" : "Show More"}
					</button>
				</p>
			</div>

			<p className="pt-4  flex-col gap-2 text-gray-400 px-2 sm:px-4 tracking-wider leading-6 sm:leading-8 xl:flex hidden">
				{descText}
			</p>
		</>
	);
};

export default Description;
