import { Checkbox, Divider, FormControlLabel, FormGroup, FormLabel, Stack, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { FilterTypes } from "../../config/Filter/filterTypes";
import { manufacturer } from "../../config/Filter/manufacturer";
import { miscellaneous } from "../../config/Filter/miscellaneous";
import { price } from "../../config/Filter/price";

type Props = {
	filter: FilterTypes;
	setFilter: React.Dispatch<React.SetStateAction<FilterTypes>>;
};

const Filter = (props: Props) => {
	let { category } = useParams<{ category: string }>();

	return (
		<Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={2}>
			<Box>
				<FormGroup>
					{miscellaneous.map((filter, index) => (
						<FormControlLabel
							key={index}
							sx={{ justifyContent: "space-between" }}
							value={filter}
							control={<Switch color="secondary" />}
							label={filter}
							labelPlacement="start"
						/>
					))}
				</FormGroup>
			</Box>
			<Box>
				<FormGroup>
					<FormLabel component="header">Manufacturer</FormLabel>
					{manufacturer[category].map((filter, index) => (
						<FormControlLabel
							key={index}
							sx={{ justifyContent: "space-between" }}
							value={filter}
							control={
								<Checkbox
									color="secondary"
									checked={props.filter.manufacturer[index][filter]}
									onClick={() => {
										let newState = [...props.filter.manufacturer];
										newState[index][filter] = !props.filter.manufacturer[index][filter];
										props.setFilter({ ...props.filter, manufacturer: newState });
									}}
								/>
							}
							label={filter}
							labelPlacement="start"
						/>
					))}
				</FormGroup>
			</Box>
			<Box>
				<FormGroup>
					<FormLabel component="header">Price</FormLabel>
					{price.map((filter, index) => (
						<FormControlLabel
							key={index}
							sx={{ justifyContent: "space-between" }}
							value={filter}
							control={
								<Checkbox
									color="secondary"
									checked={props.filter.price[index][filter]}
									onClick={() => {
										let newState = [...props.filter.price];
										newState[index][filter] = !props.filter.price[index][filter];
										props.setFilter({ ...props.filter, price: newState });
									}}
								/>
							}
							label={`$${filter}`}
							labelPlacement="start"
						/>
					))}
				</FormGroup>
			</Box>
		</Stack>
	);
};

export default Filter;
