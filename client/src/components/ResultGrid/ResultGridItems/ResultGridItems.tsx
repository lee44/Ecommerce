import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useHistory, useLocation } from "react-router";
import type { Product } from "../../../redux/api";
import StarRating from "../../StarRating/StarRating";

const ResultGridItems = (props: Product) => {
	let history = useHistory();
	let location = useLocation();

	const handleCartClick = () => {};

	const handleDetailClick = () => {
		history.push(`${location.pathname}/${props._id}`);
	};

	return (
		<Card>
			<CardMedia sx={{ height: 150, objectFit: "contain" }} component="img" alt="product_image" image={`${props.image}`} />
			<CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "start" }}>
				<StarRating rating={props.stars} reviews={props.reviews} />
				<Typography gutterBottom variant="h5">
					{props.name}
				</Typography>
				<Typography variant="h6">${props.price}</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button variant="contained" size="large" startIcon={<ShoppingCartIcon />} onClick={handleCartClick}>
					Add To Cart
				</Button>
				<Button variant="contained" size="large" onClick={handleDetailClick}>
					Details
				</Button>
			</CardActions>
		</Card>
	);
};

export default ResultGridItems;
