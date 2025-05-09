import {
	KEYS,
	LI_PREFIX,
	SUB_HEADER_PREFIX,
	SUB_SUB_HEADER_PREFIX,
	UNITS,
} from "./constants";
import { try_convert_and_resize } from "./converters";
import { last_list_id, notify } from "./globals.svelte";
import { extract_keywords } from "./keywords";
import { extract_data } from "./parser";
import { split_text } from "./renderers";
import {
	FragmentType as FragmentType,
	type IRecipe,
	type ISection,
	type IShoppingList,
	type Keywords,
} from "./types";
import {
	generate_id_for_keyword,
	generate_unique_id,
	remove_markdown,
	valid_url,
} from "./utils";

export function get_all_recipes(): IRecipe[] {
	try {
		let value = localStorage.getItem(KEYS.RECIPES);
		if (value) {
			return JSON.parse(value);
		}
	} catch (e) {
		console.error(e);
	}

	return [];
}

export function save_recipes(recipes: IRecipe[]) {
	localStorage.setItem(KEYS.RECIPES, JSON.stringify(recipes));
}

export function find_recipe_by_url(
	url: string,
	recipes: IRecipe[] | null = null
): IRecipe | null {
	if (!recipes) {
		recipes = get_all_recipes();
	}

	for (let recipe of recipes) {
		if (recipe.url === url) {
			return recipe;
		}
	}
	return null;
}

export function add_recipe(new_recipe: IRecipe, save = true): IRecipe[] {
	let recipes = get_all_recipes();
	recipes = delete_recipe(recipes, new_recipe.url, false);
	recipes.push(new_recipe);
	if (save) {
		save_recipes(recipes);
	}
	return recipes;
}

export function update_recipe(updated_recipe: IRecipe, save = true): IRecipe[] {
	let recipes = get_all_recipes();
	for (let i = 0; i < recipes.length; i++) {
		if (recipes[i].url === updated_recipe.url) {
			recipes[i] = updated_recipe;
		}
	}
	if (save) {
		save_recipes(recipes);
	}
	return recipes;
}

export function delete_recipe(
	recipes: IRecipe[],
	url: string,
	save = true
): IRecipe[] {
	recipes = recipes.filter((e) => e.url !== url);

	if (save) {
		save_recipes(recipes);
	}
	return recipes;
}

export async function try_load_url(
	url: string | null,
	title: string = "",
	force_refresh: boolean = false
): Promise<IRecipe | null> {
	if (!url || !valid_url(url)) {
		// TODO: this
		notify("ERROR", "error");
		return null;
	}

	if (!force_refresh) {
		let data = find_recipe_by_url(url);
		if (data) {
			return data;
		}
	}

	let result = await fetch(`https://corsproxy.io/?url=${encodeURI(url)}`);
	if (result.status !== 200) {
		// add_child({
		// 	tag: "h1",
		// 	text: `Uh-oh, got an error code while trying to fetch that recipe. Sorry :/ Some sites don't work with this app, unfortunately`,
		// });
		// "Uh-oh, got an error code while trying to fetch that recipe. Sorry :/ Some sites don't work with this app, unfortunately";
		notify("ERROR", "error");
	} else {
		let text = await result.text();
		let data = extract_data(url, text, title);
		add_recipe(data);
		notify("Done!", "success");
		return data;
	}

	return null;
}

export function fix_data(
	data: IRecipe | null,
	do_extract_keywords: boolean
): IRecipe | null {
	if (!data) {
		return null;
	}
	let new_data = structuredClone(data);

	if (do_extract_keywords) {
		new_data.keywords = extract_keywords(new_data);
	} else {
		new_data.keywords = {};
	}

	return new_data;
}

export function get_meta_sections(
	data: IRecipe | null,
	show_colors: boolean,
	units: UNITS,
	quantity: number
): ISection[][] {
	if (!data) {
		return [];
	}

	return [
		get_sections(
			"Ingredients",
			data.ingredients,
			data.keywords,
			show_colors,
			units,
			quantity
		),
		get_sections(
			"Instructions",
			data.instructions,
			data.keywords,
			show_colors,
			units,
			quantity
		),
		get_sections(
			"Notes",
			data.notes,
			data.keywords,
			show_colors,
			units,
			quantity
		),
	];
}

export function get_sections(
	title: string,
	list: string[],
	keywords: Keywords,
	show_colors: boolean,
	units: UNITS,
	quantity: number
): ISection[] {
	let sections = [];
	let current_section: ISection = {
		text: title,
		level: 2,
		rows: [],
	};

	if (list.length) {
		sections.push(current_section);

		for (let item of list) {
			let original = item;
			if (item.startsWith(LI_PREFIX)) {
				item = item.substr(LI_PREFIX.length);
			} else if (item.startsWith(SUB_HEADER_PREFIX)) {
				item = item.substr(SUB_HEADER_PREFIX.length);
				sections.push(
					(current_section = {
						level: 3,
						text: remove_markdown(item),
						rows: [],
					})
				);
				sections.push(current_section);
				continue;
			} else if (item.startsWith(SUB_SUB_HEADER_PREFIX)) {
				item = item.substr(SUB_SUB_HEADER_PREFIX.length);
				sections.push(
					(current_section = {
						level: 4,
						text: remove_markdown(item),
						rows: [],
					})
				);
				continue;
			}

			current_section.rows.push({
				original,
				fragments: split_text(item, keywords, show_colors),
				id: generate_unique_id("row"),
			});
		}

		for (let section of sections) {
			for (let row of section.rows) {
				for (let fragment of row.fragments) {
					switch (fragment.type) {
						case FragmentType.Ingredient:
							fragment.id = generate_id_for_keyword(
								keywords,
								fragment.text
							);
							break;

						case FragmentType.Amount:
							let oldTextContent = fragment.text;
							let newTextContent = try_convert_and_resize(
								oldTextContent,
								quantity,
								units
							);

							if (newTextContent === null) {
								fragment.failed = true;
							} else if (newTextContent !== oldTextContent) {
								fragment.text = newTextContent;
								fragment.converted = true;
							}
							break;
						default:
							break;
					}
				}
			}
		}
	}

	return sections;
}

export function get_shopping_list(id: number): IShoppingList | null {
	let lists = get_shopping_lists();
	for (let list of lists) {
		if (list.id === id) {
			return list;
		}
	}
	return null;
}

export function get_shopping_lists(): IShoppingList[] {
	try {
		let value = localStorage.getItem(KEYS.SHOPPING_LISTS);
		if (value) {
			return JSON.parse(value);
		}
	} catch (e) {
		console.error(e);
	}

	return [];
}

export function update_shopping_list(list_to_update: IShoppingList) {
	let lists = get_shopping_lists();
	for (let i = 0; i < lists.length; i++) {
		if (lists[i].id === list_to_update.id) {
			lists[i] = list_to_update;
			break;
		}
	}
	save_shopping_lists(lists);
}

// Returns the id of the new list
export function add_shopping_list(list: IShoppingList): number {
	let lists = get_shopping_lists();
	let largest = 0;
	for (let list of lists) {
		if (list.id > largest) {
			largest = list.id;
		}
	}

	let new_id = largest + 1;
	list.id = new_id;
	lists.push(list);
	save_shopping_lists(lists);

	return new_id;
}

export function save_shopping_lists(lists: IShoppingList[]) {
	localStorage.setItem(KEYS.SHOPPING_LISTS, JSON.stringify(lists));
}

export function delete_shopping_list(
	id_to_delete: number,
	lists?: IShoppingList[],
	save = true
): IShoppingList[] {
	if (!lists) {
		lists = get_shopping_lists();
	}

	lists = lists.filter((e) => e.id !== id_to_delete);
	if (save) {
		save_shopping_lists(lists);
	}
	return lists;
}

export function set_last_list_id(list_id: number | null) {
	localStorage.setItem(KEYS.LAST_LIST_ID, JSON.stringify(list_id));
	last_list_id.set(list_id);
}

export function get_last_list_id(): number | null {
	try {
		let value = localStorage.getItem(KEYS.LAST_LIST_ID);
		if (value) {
			return JSON.parse(value);
		}
	} catch (e) {}

	return null;
}
