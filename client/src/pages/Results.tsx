import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import { ResultGrid } from "../components/ResultGrid/ResultGrid";
import { useAppDispatch } from "../redux/hooks";
import { fetchProducts } from "../redux/api";

const Results = () => {
	let { category } = useParams<{ category?: string }>();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(fetchProducts("http://localhost:5000/api/processors"));
	}, []);

	return (
		<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
			<Grid item xs={12} sm={4} md={3} lg={2}>
				<Filter />
			</Grid>
			<Grid item xs={12} sm={8} md={9} lg={10}>
				<ResultGrid />
			</Grid>
		</Grid>
	);
};

export default Results;