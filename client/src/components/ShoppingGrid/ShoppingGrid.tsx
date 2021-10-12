import { Card, CardContent, CardMedia, Grid, Link, Stack, Typography } from "@mui/material";
import { useHistory } from "react-router";

type ShoppingProps = {
	category: String;
	subCategory: String[];
	url_parameter: String[];
	image_src: String;
};

const ShoppingGrid = (props: ShoppingProps) => {
	let history = useHistory();

	const handleClick = () => {
		history.push(`/results/${props.category.toLowerCase()}`);
	};
	return (
		<Grid item xs={12} md={6} lg={4}>
			<Card sx={{ display: "flex", padding: 2, justifyContent: "center", alignItems: "center", cursor: "pointer" }} onClick={handleClick}>
				<CardMedia component="img" sx={{ width: 100 }} image={process.env.PUBLIC_URL + `assets/shoppingGridItems/${props.image_src}`} alt="category_image" />
				<CardContent>
					<Typography component="div" variant="h2">
						{props.category}
					</Typography>
					<Stack spacing={1}>
						{props.url_parameter.map((url_parameter, index) => {
							return (
								<Link key={index} href={`/results/${url_parameter}`} color="inherit" underline="hover">
									{props.subCategory[index]}
								</Link>
							);
						})}
					</Stack>
				</CardContent>
			</Card>
		</Grid>
	);
};

export default ShoppingGrid;
