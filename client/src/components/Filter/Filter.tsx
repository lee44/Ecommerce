import { Checkbox, Divider, FormControlLabel, FormGroup, FormLabel, Stack, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { FilterType } from "../../redux/productSlice";

type Props = {
	filter: FilterType;
	setFilter: React.Dispatch<React.SetStateAction<FilterType>>;
};

const Filter = (props: Props) => {
	return (
		<Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={2}>
			<Box>
				<FormGroup>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="In Stock"
						control={<Switch color="secondary" />}
						label="In Stock"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="In Stock"
						control={<Switch color="secondary" />}
						label="Shipped By Newegg"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="In Stock"
						control={<Switch color="secondary" />}
						label="Free Shipping"
						labelPlacement="start"
					/>
				</FormGroup>
			</Box>
			<Box>
				<FormGroup>
					<FormLabel component="header">Manufacturer</FormLabel>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="AMD"
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.amd ? props.filter.amd : false}
								onClick={() => {
									props.setFilter({ ...props.filter, amd: !props.filter.amd });
								}}
							/>
						}
						label="AMD"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="Intel"
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.intel ? props.filter.intel : false}
								onClick={() => {
									props.setFilter({ ...props.filter, intel: !props.filter.intel });
								}}
							/>
						}
						label="Intel"
						labelPlacement="start"
					/>
				</FormGroup>
			</Box>

			<Box>
				<FormGroup>
					<FormLabel component="header">Price</FormLabel>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="75-100"
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.price ? props.filter.price.firstChoice : false}
								onClick={() => {
									props.setFilter({ ...props.filter, price: { ...props.filter.price, firstChoice: !props.filter.price.firstChoice } });
								}}
							/>
						}
						label="$75-100"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="100-200"
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.price ? props.filter.price.secondChoice : false}
								onClick={() => {
									props.setFilter({ ...props.filter, price: { ...props.filter.price, secondChoice: !props.filter.price.secondChoice } });
								}}
							/>
						}
						label="$100-200"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="200-300"
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.price ? props.filter.price.thirdChoice : false}
								onClick={() => {
									props.setFilter({ ...props.filter, price: { ...props.filter.price, thirdChoice: !props.filter.price.thirdChoice } });
								}}
							/>
						}
						label="$200-300"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value="300-400"
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.price ? props.filter.price.fourthChoice : false}
								onClick={() => {
									props.setFilter({ ...props.filter, price: { ...props.filter.price, fourthChoice: !props.filter.price.fourthChoice } });
								}}
							/>
						}
						label="$300-400"
						labelPlacement="start"
					/>
					<FormControlLabel
						sx={{ justifyContent: "space-between" }}
						value=""
						control={
							<Checkbox
								color="secondary"
								checked={props.filter.price ? props.filter.price.fifthChoice : false}
								onClick={() => {
									props.setFilter({ ...props.filter, price: { ...props.filter.price, fifthChoice: !props.filter.price.fifthChoice } });
								}}
							/>
						}
						label="$400 or Greater"
						labelPlacement="start"
					/>
				</FormGroup>
			</Box>
		</Stack>
	);
};

export default Filter;
