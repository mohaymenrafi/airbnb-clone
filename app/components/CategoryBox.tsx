"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryBoxProps {
	label: string;
	icon: IconType;
	description: string;
	selected?: boolean;
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
	label,
	description,
	icon: Icon,
	selected,
}) => {
	const router = useRouter();
	const params = useSearchParams();
	const handleCategoryClick = useCallback(() => {
		let currentQuery = {};
		if (params) {
			currentQuery = queryString.parse(params.toString());
		}
		let updatedQuery: any = {
			...currentQuery,
			category: label,
		};
		if (params?.get("category") === label) {
			delete updatedQuery.category;
		}
		const url = queryString.stringifyUrl(
			{
				url: "/",
				query: updatedQuery,
			},
			{ skipNull: true }
		);
		console.log({ url });
		router.push(url);
	}, [label, params, router]);
	return (
		<div
			onClick={handleCategoryClick}
			className={`flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
            ${
							selected
								? "border-b-neutral-800 text-neutral-800"
								: "border-transparent text-neutral-500"
						}
            `}
		>
			<Icon size={26} />
			<div className="font-medium text-sm">{label}</div>
		</div>
	);
};

export default CategoryBox;
