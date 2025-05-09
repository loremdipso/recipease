import { writable } from "svelte/store";
import { get_last_list_id } from "./data";

let ID = 0;
export interface INotification {
	text: String;
	extra_class?: String;
	id: number;
}

export const notifications = writable<INotification[]>([]);

export function notify(text: string, extra_class = "") {
	notifications.update((notifications) => [
		...notifications,
		{ text, extra_class, id: ++ID },
	]);
}

export function remove_notification(notification: INotification) {
	notifications.update((notifications) => {
		let new_notifications = [...notifications];
		for (let i = 0; i < new_notifications.length; i++) {
			if (new_notifications[i] && new_notifications[i] === notification) {
				new_notifications.splice(i, 1);
				i -= 1;
			}
		}
		return new_notifications;
	});
}

export const last_list_id = writable<number | null>(get_last_list_id());

export const installPrompt = writable<any>(null);
window.addEventListener("beforeinstallprompt", (event) => {
	event.preventDefault();
	installPrompt.set(event);
});
