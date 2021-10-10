import { Container, Grid } from "@mui/material";
import { Product } from "../../redux/api";
import ResultGridItems from "./ResultGridItems/ResultGridItems";

type Props = {
	products: Product[];
};

export const ResultGrid = (props: Props) => {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
				{props.products.map((product) => {
					return (
						<Grid key={product._id} item xs={12} md={6} lg={3}>
							<ResultGridItems {...product} />
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};
