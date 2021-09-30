import { Button, Container, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import LineBreak from "../LineBreak/LineBreak";

const PurchaseOptions = () => {
	return (
		<Paper elevation={2} sx={{ py: 2 }}>
			<Container maxWidth="xl">
				<FormControl component="fieldset" fullWidth>
					<RadioGroup defaultValue="Buynew" name="radio-buttons-group">
						<FormControlLabel
							value="Buynew"
							control={
								<Radio
									color="secondary"
									sx={{
										color: "primary.main",
									}}
								/>
							}
							label="Buy New"
						/>
						<FormControlLabel
							value="Buyused"
							control={
								<Radio
									color="secondary"
									sx={{
										color: "primary.main",
									}}
								/>
							}
							label="Buy Used"
						/>
					</RadioGroup>
				</FormControl>
				<Typography variant="subtitle1" textAlign="start">
					Sold by: Newegg
				</Typography>
				<Typography variant="subtitle1" textAlign="start">
					FREE Delivery: Sep 22
				</Typography>
				<LineBreak />
				<Typography variant="h5" fontWeight="bold" textAlign="start">
					$399.99
				</Typography>
				<Grid container sx={{ my: 2 }} columnSpacing="10">
					<Grid item xs={12} sm={3}>
						<TextField type="number" size="small" />
					</Grid>
					<Grid item xs={12} sm={9}>
						<Button size="large" variant="contained" color="secondary" fullWidth>
							CHECKOUT
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
};

export default PurchaseOptions;
