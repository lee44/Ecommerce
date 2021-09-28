import { Container, Grid } from "@mui/material";
import ResultGridItems from "./ResultGridItems/ResultGridItems";
import { useAppSelector } from "../../redux/hooks";

export const ResultGrid = () => {
	const products = useAppSelector((state) => {
		return state.products.result;
	});

	return (
		<Container maxWidth="xl">
			<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
				{products.map((product) => {
					return (
						<Grid item xs={12} md={6} lg={3}>
							<ResultGridItems {...product} />
						</Grid>
					);
				})}
			</Grid>
		</Container>
	);
};
