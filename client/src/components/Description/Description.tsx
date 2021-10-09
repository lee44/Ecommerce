import { Container, Typography } from "@mui/material";
import type { Product } from "../../redux/api";
import BulletDetails from "../BulletDetails/BulletDetails";
import LineBreak from "../LineBreak/LineBreak";
import StarRating from "../StarRating/StarRating";

export const Description = (props: Product) => {
	return (
		<Container maxWidth="xl">
			<Typography variant="h1" textAlign="start">
				{props.full_name}
			</Typography>
			<StarRating rating={props.stars} reviews={props.reviews} />
			<LineBreak />
			<BulletDetails details={props.details} />
		</Container>
	);
};
