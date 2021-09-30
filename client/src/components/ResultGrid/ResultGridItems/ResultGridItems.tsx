import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarRating from "../../StarRating/StarRating";
import type { Product } from "../../../redux/api";
import { useHistory, useLocation, useParams } from "react-router";

const ResultGridItems = (props: Product) => {
	let history = useHistory();
	let location = useLocation();

	const handleCartClick = () => {};

	const handleDetailClick = () => {
		history.push(`${location.pathname}/${props._id}`);
	};

	return (
		<Card>
			<CardMedia sx={{ height: 150, objectFit: "contain" }} component="img" alt="product_image" image={`data:image/jpeg;base64,${props.image}`} />
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
