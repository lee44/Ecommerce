import { Container, Grid } from "@mui/material";
import { useParams } from "react-router";
import { Description } from "../../components/Description/Description";
import PurchaseOptions from "../../components/PurchaseOpionts/PurchaseOptions";
import { useAppSelector } from "../../redux/hooks";
import { StyleCarousel } from "./style";

type DetailsParam = {
	id: string;
};
const Details = () => {
	let { id } = useParams<DetailsParam>();
	const products = useAppSelector((state) => {
		return state.products.result.find((product) => product._id === id);
	});
	return (
		<Container maxWidth="xl">
			<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
				<Grid item xs={12} sm={4} md={3}>
					<StyleCarousel showStatus={false} showIndicators={false} showArrows={false}>
						{products?.image.map((url, index) => {
							return (
								<div key={index}>
									<img src={url} alt="product_image" />
								</div>
							);
						})}
					</StyleCarousel>
				</Grid>
				<Grid item xs={12} sm={8} md={6}>
					{products ? <Description {...products} /> : ""}
				</Grid>
				<Grid item xs={12} sm={4} md={3}>
					<PurchaseOptions />
				</Grid>
			</Grid>
		</Container>
	);
};

export default Details;
