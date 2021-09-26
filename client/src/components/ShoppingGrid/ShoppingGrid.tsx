import React from "react";
import i9 from "../../assets/i9.jpg";
import { Card, CardContent, CardMedia, Container, Grid, Link, Paper, Stack, Typography } from "@mui/material";

type ShoppingProps = {
	category: String;
	subCategory: String[];
	url_parameter: String[];
	image_src: String;
};

const ShoppingGrid = (props: ShoppingProps) => {
	return (
		<Grid item xs={12} md={6} lg={4}>
			<Card sx={{ display: "flex", padding: 2, justifyContent: "center", alignItems: "center" }}>
				<CardMedia component="img" sx={{ width: 100 }} image={process.env.PUBLIC_URL + `assets/shoppingGridItems/${props.image_src}`} alt="category_image" />
				<CardContent>
					<Typography component="div" variant="h6">
						{props.category}
					</Typography>
					<Stack spacing={1}>
						<Link href={`/results/${props.url_parameter[0]}`} color="inherit" underline="hover">
							{props.subCategory[0]}
						</Link>
						<Link href={`/results/${props.url_parameter[1]}`} color="inherit" underline="hover">
							{props.subCategory[1]}
						</Link>
						<Link href={`/results/${props.url_parameter[2]}`} color="inherit" underline="hover">
							{props.subCategory[2]}
						</Link>
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ShoppingGrid;
