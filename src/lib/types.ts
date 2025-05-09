export interface IParseError {
	text: string;
	recipe_url: string;
	line_number: number;
}

export interface IShoppingList {
	id: number;
	name: string;
	items: IShoppingListItem[];
	checkedItems: { [key: string]: boolean };
}

export interface IShoppingListItem {
	recipe_url: string;
	quantity: number;
}

export interface IIngredient {
	name: string;
	quantities: IQuantity[];
}

export interface IQuantity {
	recipe_count: number;
	ingredient_quantity: string;
	original_line: string;
}

export interface IRecipe {
	title: string;
	url: string;
	ingredients: string[];
	instructions: string[];
	notes: string[];
	keywords: Keywords;
}

export type Keywords = {
	[key: string]: FragmentType;
};

export enum FragmentType {
	Unknown,
	Plain,
	Bold,
	Italic,
	Ingredient,
	Temperature,
	Amount,
}

export interface ISection {
	text: string;
	level: Number;
	rows: IRow[];
}

export interface IRow {
	id: string;
	fragments: IFragment[];
	original: string;
}

export interface IFragment {
	type: FragmentType;
	text: string;
	converted?: boolean;
	failed?: boolean;
	id?: string;
}

export interface IPreferences {
	keep_screen_awake: boolean;
	show_colors: boolean;
}

export interface IPageData {
	is_going_back?: boolean;
	skip_page_animation?: boolean;
	previously_selected_recipe?: string | null;
}
