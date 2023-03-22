import React, { useEffect, useState } from "react";
import { getCategories } from "../services";
import Link from "next/link";

const Categories = () => {
	const [categories, setCategories] = useState([]);

  const fetchCategories =async () => {
    const result = await getCategories();
		setCategories(result as any);
		// console.log("categories", categories);
  }
	useEffect(() => {
		fetchCategories()
	}, []);
	return (
		<div className="bg-white shadow-lg rounded-lg p-8 mb-8 pb-12">
			<h3 className="text-xl mb-8 font-semibold pb-4 border-b">
        Categories
			</h3>
      {categories.map((category:any) => (
        <Link key={category?.slug} href={`/category/${category.slug}`}>
          <span className="cursor-pointer block pb-3 mb-3">
              {category.name}
          </span>
        </Link>
      ))}
		</div>
	);
};

export default Categories;
