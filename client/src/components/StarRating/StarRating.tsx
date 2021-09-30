import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";

type Stars = {
	rating: number;
	reviews: number;
};
const StarRating = (props: Stars) => {
	return (
		<Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
			<Rating name="read-only" value={props.rating} readOnly />
			<Box sx={{ ml: 1 }}>
				<Typography>({props.reviews})</Typography>
			</Box>
		</Box>
	);
};

export default StarRating;
