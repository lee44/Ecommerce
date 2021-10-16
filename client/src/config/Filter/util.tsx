import { Product } from "../../redux/api";
import { RootState } from "../../redux/store";
import { FilterTypes, Group } from "../../typings/filter";

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
 * @param {FilterTypes} filters all the filters selected
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
 * Returns products that fall under any of the filters selected
 * @param {RootState} state access to the store
 * @param {FilterTypes} filters all the filters selected
 */
export function applyFilters(state: RootState, filters: FilterTypes[]) {
	return state.products.result.filter((product) => {
		const showByManufacturer = isShownByManufacturer(product, filters);
		const showByPrice = isShownByPrice(product, filters);
		return showByManufacturer && showByPrice;
	});
}

/**
 * Checks if the product falls under any of the manufacturer filters selected
 * @param {Product} product
 * @param {FilterTypes} filters filters selected for manufacturers
 */
function isShownByManufacturer(product: Product, filters: FilterTypes[]) {
	const manufacturerFilters = filters.filter((filter) => filter.group === Group.MANUFACTURER);
	if (!manufacturerFilters.length) return true;
	return manufacturerFilters.some((filter) => filter.fnc(product));
}

/**
 * Checks if the product falls under any of the price filters selected
 * @param {Product} product
 * @param {FilterTypes} filters filters selected for manufacturers
 */
function isShownByPrice(product: Product, filters: FilterTypes[]) {
	const priceFilters = filters.filter((filter) => filter.group === Group.PRICE);
	if (!priceFilters.length) return true;
	return priceFilters.some((filter) => filter.fnc(product));
}
