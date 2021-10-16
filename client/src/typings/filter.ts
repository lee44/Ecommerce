export enum Group {
	MANUFACTURER = "manufacturer",
	PRICE = "price"
}

export type FilterTypes = {
	name: string | number;
	group: Group;
	fnc: Function;
};