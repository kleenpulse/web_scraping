import LoadingSpinner from "@/components/LoadingSpinner";
import React from "react";

export default function loading() {
	return (
		<div className="flex items-center justify-center h-[484px] scale-150 -mb-10">
			<LoadingSpinner />
		</div>
	);
}
