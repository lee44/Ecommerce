import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import Filter from "../../components/Filter/Filter";
import ProgressCircle from "../../components/ProgressCircle/ProgressCircle";
import { ResultGrid } from "../../components/ResultGrid/ResultGrid";
import { fetchProducts } from "../../redux/api";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const Results = () => {
	const dispatch = useAppDispatch();
	const productsLoading = useAppSelector((state) => {
		return state.products.status;
	});

	useEffect(() => {
		dispatch(fetchProducts("http://localhost:5000/api/processors"));
	}, []);

	return (
		<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
			<Grid item xs={12} sm={4} md={3} lg={2}>
				<Filter />
			</Grid>
			<Grid item xs={12} sm={8} md={9} lg={10}>
				{productsLoading === "idle" ? <ProgressCircle /> : <ResultGrid />}
			</Grid>
		</Grid>
	);
};

export default Results;
