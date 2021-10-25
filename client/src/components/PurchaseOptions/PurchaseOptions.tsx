import { Button, Container, FormControl, FormControlLabel, Grid, Paper, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Product } from "../../redux/typings/product";
import LineBreak from "../LineDivider/LineDivider";

const PurchaseOptions = (props: Product) => {
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
				<Typography sx={{ my: 2 }} variant="h4" textAlign="start">
					Sold by: Newegg
				</Typography>
				<Typography variant="h4" textAlign="start">
					FREE Delivery: Sep 22
				</Typography>
				<LineBreak />
				<Typography variant="h2" fontWeight="bold" textAlign="start">
					${props.price}
				</Typography>
				<Grid container sx={{ my: 2 }} columnSpacing="10">
					<Grid item xs={12} sm={4}>
						<TextField type="number" size="medium" sx={{ "& input": { padding: "14px 8px 14px 26px", minWidth: 35 } }} defaultValue="0" />
					</Grid>
					<Grid item xs={12} sm={8}>
						<Button sx={{ fontWeight: "bold", fontSize: "h3.fontSize" }} size="large" variant="contained" color="secondary" fullWidth>
							CHECKOUT
						</Button>
					</Grid>
				</Grid>
			</Container>
		</Paper>
	);
};

export default PurchaseOptions;
