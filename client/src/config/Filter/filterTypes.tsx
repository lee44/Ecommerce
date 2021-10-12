import { Product } from "../../redux/api";
import { RootState } from "../../redux/store";
import { manufacturer } from "./manufacturer";
import { price } from "./price";

export type FilterTypes = {
	manufacturer: {
		[name: string]: boolean | undefined;
	}[];
	price: {
		[range: string]: boolean;
	}[];
};

export const getManufacturers = (category: string) => {
	return manufacturer[category].map((filter) => {
		let obj: { [key: string]: boolean } = {};
		obj[filter] = true;
		return obj;
	});
};
export const getPrices = () => {
	return price.map((filter) => {
		let obj: { [key: string]: boolean } = {};
		obj[filter] = true;
		return obj;
	});
};

export const filterProducts = (state: RootState, filterStates: FilterTypes) => {
	const filterManufacturers = (product: Product) => {
		filterStates.manufacturer.map((filter) => {
			for (const key in filter) {
			}
		});

		return filterStates.manufacturer ? true : product.manufacturer !== "AMD";
	};

	return state.products.result.filter(filterManufacturers);
};
