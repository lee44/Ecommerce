import { RootState } from "../../redux/store";
import { Product } from "../../typings/product";

export enum Group {
	MANUFACTURER = "Manufacturer",
	PRICE = "Price",
	SHIPPED_BY_NEWEGG = "Shipped By Newegg",
	STOCK = "In Stock",
	FREE_SHIPPING = "Free Shipping",
}

export type FilterTypes = {
	name: string | number;
	group: Group;
	fnc: Function;
};

export function addFilter(name: string | number, group: Group, fnc: Function, setFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>) {
	setFilters((currentFilters) => [...currentFilters, { name, group, fnc }]);
}

export function removeFilter(name: string | number, group: Group, setFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>) {
	setFilters((currentFilters) => currentFilters.filter((f) => !(f.name === name && f.group === group)));
}

/**
 * Return true if filter exists
 * @param {string | number} name name of the filter
 * @param {Group} group is the group the filter belongs to
 * @param {FilterTypes} filters all the selected filters
 */
export function filterExists(name: string | number, group: Group, filters: FilterTypes[]) {
	return filters.find((f) => f.name === name && f.group === group) !== undefined;
}

/**
 * Add or Remove the filter from the useState
 * @param {string | number} name name of the filter
 * @param {Group} group is the group the filter belongs to
 * @param {Function} fnc defines how to filter the product
 * @param {FilterTypes[]} filters useState that stores all filters
 * @param {React.Dispatch<React.SetStateAction<FilterTypes[]>>} setFilters used for updating the state value
 */
export function toggleFilter(
	name: string | number,
	group: Group,
	fnc: Function,
	filters: FilterTypes[],
	setFilters: React.Dispatch<React.SetStateAction<FilterTypes[]>>
) {
	if (filterExists(name, group, filters)) {
		removeFilter(name, group, setFilters);
	} else {
		addFilter(name, group, fnc, setFilters);
	}
}

/**
 * Returns products that fall under any of the selected filters
 * @param {RootState} state access to the store
 * @param {FilterTypes} filters all the selected filters
 */
export function applyFilters(state: RootState, filters: FilterTypes[]) {
	return state.products.result.filter((product) => {
		return checkFilters(product, filters);
	});
}

/**
 * Returns true if the product falls under any of the selected filters
 * @param {Product} product product to be evaluated
 * @param {FilterTypes} filters all selected filters
 */
function checkFilters(product: Product, filters: FilterTypes[]) {
	let isFilter = true;
	for (const value of Object.values(Group)) {
		let selectedFilters = filters.filter((filter) => filter.group === value);
		if (!selectedFilters.length) {
			continue;
		} else {
			isFilter = isFilter && selectedFilters.some((filter) => filter.fnc(product));
		}
	}
	return isFilter;
}
