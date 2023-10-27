"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

const Modal = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsOpen(false);
			}
		};

		document.addEventListener("keydown", handleKeyDown);

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
		};
	}, [isOpen]);
	return (
		<>
			{!isOpen && (
				<button className="show-btn" onClick={() => setIsOpen(true)}>
					Track
				</button>
			)}

			<div
				className={`${
					isOpen
						? " bg-black/70  opacity-0 animate-modalOverlay "
						: "hide-overlay"
				} top-0 left-0 z-50 fixed min-h-screen w-full cursor-pointer`}
				onClick={() => setIsOpen(false)}
			/>

			<div
				className={`${
					isOpen
						? "  left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 "
						: "hide-modal  "
				}fixed top-1/2   max-[550px]:w-full max-[550px]:flex justify-center  `}
			>
				<div
					role="dialog"
					className="flex flex-col bg-primary/10 backdrop-blur-xl min-[550px]:p-6 p-3 text-white w-[90%] min-[550px]:w-[500px]  rounded-xl animate-slideDown translate-y-10 opacity-0 gap-5 "
				>
					<div className="w-full flex justify-between items-center">
						<Image
							src="/assets/icons/logo.svg"
							width={27}
							height={27}
							alt="logo"
						/>
						<button
							type="button"
							className="p-[2px]  h-7 w-7 rounded-full border border-primary"
							onClick={() => setIsOpen(false)}
						>
							<Image
								src="/assets/icons/x-close.svg"
								width={25}
								height={25}
								alt="logo"
							/>
						</button>
					</div>
					<div className="w-full flex flex-col gap-4 sm:pr-4">
						<p className="text-lg sm:text-xl font-medium text-primary max-[410px]:text-sm">
							Stay updated with product pricing alerts right in your inbox!
						</p>
						<p className="text-sm sm:text-lg  text-gray-200 max-[410px]:text-[12px]">
							Never miss a bargain again with our timely alerts!
						</p>
					</div>

					<form
						onSubmit={handleSubmit}
						className="flex flex-col gap-4"
						autoComplete="off"
					>
						<label htmlFor="email">
							Email address
							<div className="flex p-3 py-4 w-full rounded-xl bg-primary/10 text-white mt-4 gap-4">
								<Image
									src="/assets/icons/mail.svg"
									width={25}
									height={25}
									alt="logo"
								/>
								<input
									autoComplete="off"
									type="email"
									id="email"
									className=" outline-none w-full bg-transparent"
									placeholder="Enter your email"
									required
									pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
									value={email}
									onChange={(e) =>
										setEmail(e.target.value.trim().toLowerCase())
									}
								/>
							</div>
						</label>
						<button
							disabled={
								!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
							}
							type="submit"
							className="mt-4 bg-primary/10 rounded-xl py-4 text-primary font-medium text-lg sm:text-xl hover:bg-primary/20 transition-all duration-300 active:scale-90 disabled:!cursor-not-allowed disabled:opacity-50 disabled:hover:bg-primary/10 disabled:active:scale-100"
						>
							Start Tracking!
						</button>
					</form>
				</div>
			</div>
		</>
	);
};

export default Modal;
