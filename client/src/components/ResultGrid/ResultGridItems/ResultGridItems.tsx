import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarRating from "../../StarRating/StarRating";

const ResultGridItems = () => {
	return (
		<Card>
			<CardMedia component="img" alt="green iguana" image="" />
			<CardContent sx={{ display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "start" }}>
				<StarRating />
				<Typography gutterBottom variant="h5">
					AMD Ryzen 5800X
				</Typography>
				<Typography variant="h6">$399.99</Typography>
			</CardContent>
			<CardActions sx={{ justifyContent: "center" }}>
				<Button variant="contained" size="large" startIcon={<ShoppingCartIcon />}>
					Add To Cart
				</Button>
				<Button variant="contained" size="large">
					Details
				</Button>
			</CardActions>
		</Card>
	);
};

export default ResultGridItems;
