import { notify } from "./globals.svelte";
import type { Keywords } from "./types";
import { goto as native_goto } from "$app/navigation";
import { base } from "$app/paths";

export function remove_markdown(text: string): string {
	return text.replaceAll("**", "");
}

export function get_last_word(text: string, number_of_pieces = 1): string {
	let pieces = text.split(" ");
	while (pieces.length > number_of_pieces) {
		pieces.shift();
	}
	return pieces.join(" ");
}

export function fix_regex(text: string): string {
	return text.replaceAll(/^\s+(\/\/.*)?/gm, "").replaceAll("\n", "");
}

export function round(
	value: string | number,
	places: number,
	try_fractionalize = false
): string | number {
	if (typeof value === "string") {
		return value;
	}

	value *= 10 ** places;
	value = Math.round(value);
	value /= 10 ** places;
	if (try_fractionalize) {
		if (equals(value, 1 / 2)) {
			return "1/2";
		}
		if (equals(value, 1 / 3)) {
			return "1/3";
		}
		if (equals(value, 1 / 4)) {
			return "1/4";
		}
		if (equals(value, 1 / 8)) {
			return "1/8";
		}
		if (equals(value, 2 / 3)) {
			return "2/3";
		}
		if (equals(value, 3 / 4)) {
			return "3/4";
		}
	}

	return value;
}

export function is_number(str: any): boolean {
	return !isNaN(Number(str)) && !isNaN(parseFloat(str));
}

export function equals(a: number, b: number): boolean {
	return Math.abs(a - b) < 0.01;
}

export function iter_over_unmarked_sections(
	str: string,
	cb: (piece: string) => string
): string {
	return str
		.split(/(\*\*[^\*]+\*\*)/)
		.map((piece) => {
			if (piece.startsWith("**") && piece.endsWith("**")) {
				return piece;
			}

			return cb(piece);
		})
		.join("");
}

export function generate_id_for_keyword(
	keywords: Keywords,
	term: string
): string {
	term = term.toLowerCase();
	let last_word = get_last_word(term);
	if (keywords[last_word]) {
		return last_word;
	}
	return term.replaceAll(/\s/g, "_");
}

let ID = 0;
export const generate_unique_id = (prefix: string) => {
	return `${prefix}_${++ID}`;
};

export function longest(a: string, b: string) {
	return b.length - a.length;
}

export function valid_url(url: string | null): boolean {
	if (!url || !url.length || url.length > 500) {
		return false;
	}

	try {
		let new_url = new URL(url);
		return new_url.protocol === "http:" || new_url.protocol === "https:";
	} catch (_) {
		return false;
	}
}

export function get_query_url(): string | null {
	// TODO: what do about this?
	// decodeURIComponent(url.searchParams.get("name") || "")
	let url_obj = new URL((document as any).location);
	let url =
		url_obj.searchParams.get("link") ||
		url_obj.searchParams.get("description") ||
		url_obj.searchParams.get("url");
	if (url) {
		return decodeURI(url);
	}
	return null;
}

export async function get_url_from_clipboard(): Promise<string | undefined> {
	const items = await navigator.clipboard.read();
	outerloop: for (const item of items) {
		for (const type of item.types) {
			const blob = await item.getType(type);
			const text = await blob.text();
			if (valid_url(text)) {
				notify("Loading...");
				return text;
			}

			break outerloop;
		}
	}

	notify("Didn't find a recipe url in your clipboard. Sorry bud :/");
}

export async function goto(url: string, query_params?: {}) {
	await native_goto(get_url(url));
}

export function get_url(
	relative_url: string,
	query_params?: { [key: string]: string }
) {
	if (!relative_url.startsWith("/")) {
		relative_url = `/${relative_url}`;
	}
	let url = `${base}${relative_url}`;
	if (query_params) {
		let params = new URLSearchParams();
		for (let key of Object.keys(query_params)) {
			params.append(key, query_params[key]);
		}
		url += `?${params.toString()}`;
	}
	return url;
}
