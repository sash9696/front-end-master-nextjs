import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Category, getCategories } from "../services";

const Header = (): JSX.Element => {
	const [categories, setCategories] = useState<Category[]>([]);

	const fetchCategories = async () => {
		const result = await getCategories();
		setCategories(result);
		console.log("categories", categories);
	};
	useEffect(() => {
		fetchCategories();
	}, []);
	return (
		<div className="container mx-auto px-10 mb-8">
			<div className="border-b w-full inline-block border-blue-400 py-8">
				<div className="md:float-left block">
					<Link href="/">
						<span className="cursor-pointer font-bold text-4xl text-white">
							Front End Hub
						</span>
					</Link>
				</div>
				<div className="hidden md:float-left md:contents">
					{categories.map((category) => (
						<Link
							key={category.slug}
							href={`/category/${category.slug}`}>
							<span className="md:float-right mt-2 align-middle text-white ml-4 font-semibold cursor-pointer">
								{category.name}
							</span>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Header;
