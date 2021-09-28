import { Container, Grid } from "@mui/material";
import ResultGridItems from "./ResultGridItems/ResultGridItems";

export const ResultGrid = () => {
	return (
		<Container maxWidth="xl">
			<Grid container spacing={1} sx={{ marginTop: 1, marginBottom: 1 }}>
				<Grid item xs={12} md={6} lg={3}>
					<ResultGridItems />
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<ResultGridItems />
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<ResultGridItems />
				</Grid>
				<Grid item xs={12} md={6} lg={3}>
					<ResultGridItems />
				</Grid>
			</Grid>
		</Container>
	);
};
