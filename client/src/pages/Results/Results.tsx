import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
import { ResultGrid } from "../../components/ResultGrid/ResultGrid";
import { applyFilters, FilterTypes } from "../../config/Filter/util";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/productSlice";

const Results = () => {
	const [filters, setFilters] = useState<FilterTypes[]>([]);
	const dispatch = useAppDispatch();
	const productsStatus = useAppSelector((state) => {
		return state.products.status;
	});
	const products = useAppSelector((state) => {
		return applyFilters(state, filters);
	});

	useEffect(() => {
		dispatch(fetchProducts("http://localhost:5000/api/processors"));
	}, [dispatch]);

	return (
		<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
			<Grid item xs={12} sm={4} md={3} lg={2}>
				<Filter filters={filters} setFilters={setFilters} />
			</Grid>
			<Grid item xs={12} sm={8} md={9} lg={10}>
				{productsStatus === "idle" ? <ProgressCircle /> : <ResultGrid products={products} />}
			</Grid>
		</Grid>
	);
};

export default Results;
