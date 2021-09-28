import { Rating, Typography } from "@mui/material";
import { Box } from "@mui/system";

const StarRating = () => {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Rating name="read-only" value={2} readOnly />
			<Box sx={{ ml: 1 }}>
				<Typography>(1000)</Typography>
			</Box>
		</Box>
	);
};

export default StarRating;
