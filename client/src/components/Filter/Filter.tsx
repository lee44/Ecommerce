import { Checkbox, Divider, FormControlLabel, FormGroup, FormLabel, Stack, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { useParams } from "react-router-dom";
import { price, shippingFilter } from "../../config/Filter/items";
import { manufacturerFilter } from "../../config/Filter/manufacturer";
import { filterExists, FilterTypes, Group, toggleFilter } from "../../config/Filter/util";
import { Product } from "../../redux/typings/product";

type Props = {
	filters: FilterTypes[];
	setFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>;
};

const Filter = (props: Props) => {
	let { category } = useParams<{ category: string }>();

	return (
		<Stack direction="column" divider={<Divider orientation="horizontal" flexItem />} spacing={2}>
			<Box>
				<FormGroup>
					{shippingFilter.map((filter, index) => (
						<FormControlLabel
							key={index}
							sx={{ justifyContent: "space-between" }}
							value={filter}
							control={
								<Switch
									color="secondary"
									checked={filterExists(
										filter,
										filter === Group.STOCK ? Group.STOCK : filter === Group.FREE_SHIPPING ? Group.FREE_SHIPPING : Group.SHIPPED_BY_NEWEGG,
										props.filters
									)}
									onClick={() => {
										toggleFilter(
											filter,
											filter === Group.STOCK ? Group.STOCK : filter === Group.FREE_SHIPPING ? Group.FREE_SHIPPING : Group.SHIPPED_BY_NEWEGG,
											(p: Product) => (filter === "Shipped By Newegg" ? filter.includes(p.shipped_by) : p.free_shipping),
											props.filters,
											props.setFilters
										);
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
					<FormLabel component="header">Manufacturer</FormLabel>
					{manufacturerFilter[category].map((filter, index) => (
						<FormControlLabel
							key={index}
							sx={{ justifyContent: "space-between" }}
							value={filter}
							control={
								<Checkbox
									color="secondary"
									checked={filterExists(filter, Group.MANUFACTURER, props.filters)}
									onClick={() => {
										toggleFilter(filter, Group.MANUFACTURER, (p: Product) => p.manufacturer === filter, props.filters, props.setFilters);
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
									checked={filterExists(filter, Group.PRICE, props.filters)}
									onClick={() => {
										toggleFilter(
											filter,
											Group.PRICE,
											(p: Product) => {
												const priceRange = filter.split("-");
												if (priceRange.length > 1) return p.price >= parseInt(priceRange[0]) && p.price <= parseInt(priceRange[1]);
												else {
													const lastPriceRange = filter.split("or");
													return p.price >= parseInt(lastPriceRange[0]);
												}
											},
											props.filters,
											props.setFilters
										);
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
