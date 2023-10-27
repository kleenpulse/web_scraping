type Props = {
	color?: string;
	innerColor?: string;
};
const LoadingSpinner = ({ color, innerColor }: Props) => (
	<div className="relative h-9 w-9 ">
		<div
			className={`animate-loadspin rounded-full border-4 border-r-transparent border-b-transparent ${
				color || "border-primary"
			} border-solid h-9 w-9 absolute `}
		/>

		<div
			className={` rounded-full border-4  ${
				innerColor || "border-primary/30"
			} border-solid h-9 w-9`}
		/>
	</div>
);

export default LoadingSpinner;
