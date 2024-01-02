import type { Item } from './types';

export function keys<T extends object>(obj: T) {
	return Object.keys(obj) as Array<keyof T>;
}

export function areArraysEqual(arr1: any[], arr2: any[]): boolean {
	if (arr1.length !== arr2.length) {
		return false;
	}

	for (let i = 0; i < arr1.length; i++) {
		if (!areObjectsEqual(arr1[i], arr2[i])) {
			return false;
		}
	}

	return true;
}

export function areObjectsEqual(obj1: any, obj2: any): boolean {
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 === null || obj2 === null) {
		return obj1 === obj2;
	}

	const keys1 = Object.keys(obj1);
	const keys2 = Object.keys(obj2);

	if (keys1.length !== keys2.length) {
		return false;
	}

	for (const key of keys1) {
		if (!areObjectsEqual(obj1[key], obj2[key])) {
			return false;
		}
	}

	return true;
}

export function isItemColliding(item: Item, otherItem: Item) {
	return (
		item.id !== otherItem.id &&
		item.x <= otherItem.x + otherItem.w - 1 &&
		item.y <= otherItem.y + otherItem.h - 1 &&
		item.x + item.w - 1 >= otherItem.x &&
		item.y + item.h - 1 >= otherItem.y
	);
}

export function areItemsColliding(item: Item, items: Item[]) {
	for (const item2 of items) {
		if (isItemColliding(item, item2)) return true;
	}
	return false;
}
