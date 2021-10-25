import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useHistory, useLocation } from "react-router";
import { addToCart } from "../../../redux/cartSlice";
import { useAppDispatch } from "../../../redux/hooks";
import { Product } from "../../../redux/typings/product";
import StarRating from "../../StarRating/StarRating";

const GridItems = (props: Product) => {
	let history = useHistory();
	let location = useLocation();
	const dispatch = useAppDispatch();

	const handleCartClick = (id: string) => {
		dispatch(addToCart(id));
	};

	const handleDetailClick = () => {
		history.push(`${location.pathname}/${props._id}`);
	};

	return (
		<Card variant="outlined">
			<CardMedia sx={{ height: 150, objectFit: "contain" }} component="img" alt="product_image" image={props.image[0]} />
			<CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "start" }}>
				<StarRating rating={props.stars} reviews={props.reviews} />
				<Typography gutterBottom variant="h2" sx={{ fontWeight: "medium" }}>
					{props.name}
				</Typography>
				<Typography variant="h3">${props.price}</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button variant="contained" size="large" startIcon={<ShoppingCartIcon />} onClick={() => handleCartClick(props._id)}>
					Add To Cart
				</Button>
				<Button variant="contained" size="large" onClick={handleDetailClick}>
					Details
				</Button>
			</CardActions>
		</Card>
	);
};

export default GridItems;
