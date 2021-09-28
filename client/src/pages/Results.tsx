import { Container, Grid } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import Filter from "../components/Filter/Filter";
import { ResultGrid } from "../components/ResultGrid/ResultGrid";

const Results = () => {
	let { category } = useParams<{ category?: string }>();

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
