import { Container, Grid } from "@mui/material";
import { Description } from "../../components/Description/Description";
import PurchaseOptions from "../../components/PurchaseOpionts/PurchaseOptions";
import { StyleCarousel } from "./style";

const Details = () => {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
				<Grid item xs={12} sm={4} md={3}>
					<StyleCarousel showStatus={false} showIndicators={false} showArrows={false}>
						<div>
							<img src={`http://localhost:3000/assets/shoppingGridItems/case.png`} />
						</div>
						<div>
							<img src={`http://localhost:3000/assets/shoppingGridItems/cpu.png`} />
						</div>
						<div>
							<img src={`http://localhost:3000/assets/shoppingGridItems/storage.png`} />
						</div>
					</StyleCarousel>
				</Grid>
				<Grid item xs={12} sm={8} md={6}>
					<Description />
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<PurchaseOptions />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Details;
