import { Container, Typography } from "@mui/material";
import BulletDetails from "../BulletDetails/BulletDetails";
import LineBreak from "../LineBreak/LineBreak";
import StarRating from "../StarRating/StarRating";

export const Description = () => {
	return (
		<Container maxWidth="xl">
			<Typography variant="h5" textAlign="start">
				AMD Ryzen Threadripper PRO 3955WX - Ryzen Threadripper PRO Castle Peak (Zen 2) 16-Core 3.9 GHz Socket sWRX8 280W Desktop Processor - 100-100000167WOF
			</Typography>
			<StarRating rating={3} reviews={100} />
			<LineBreak />
			<BulletDetails />
		</Container>
	);
};
