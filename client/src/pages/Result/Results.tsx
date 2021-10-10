import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
import { ResultGrid } from "../../components/ResultGrid/ResultGrid";
import { fetchProducts } from "../../redux/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { filterProducts, FilterType } from "../../redux/productSlice";

const Results = () => {
	const [filter, setFilter] = useState<FilterType>({
		amd: true,
		intel: true,
		price: {
			firstChoice: true,
			secondChoice: true,
			thirdChoice: true,
			fourthChoice: true,
			fifthChoice: true,
		},
	});
	const dispatch = useAppDispatch();
	const productsStatus = useAppSelector((state) => {
		return state.products.status;
	});
	const products = useAppSelector((state) => {
		return filterProducts(state, filter);
	});

	console.log("Rerendered");

	useEffect(() => {
		dispatch(fetchProducts("http://localhost:5000/api/processors"));
	}, [dispatch]);

	return (
		<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
			<Grid item xs={12} sm={4} md={3} lg={2}>
				<Filter filter={filter} setFilter={setFilter} />
			</Grid>
			<Grid item xs={12} sm={8} md={9} lg={10}>
				{productsStatus === "idle" ? <ProgressCircle /> : <ResultGrid products={products} />}
			</Grid>
		</Grid>
	);
};

export default Results;
