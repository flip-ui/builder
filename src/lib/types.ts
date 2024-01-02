export enum GuiType {
	Header = 'header',
	BodyText = 'body-text',
	Buttons = 'buttons',
	Alert = 'alert'
}

export enum GuiAlign {
	Left = 'left',
	Right = 'right',
	Top = 'top',
	Bottom = 'bottom',
	Center = 'center'
}

export enum EventType {
	View = 'view',
	Function = 'function'
}

export type Option<T> = T | null;
export type IdArray<T> = { rows: T[]; id: string }[];
export type EventData<T extends EventType> = T extends EventType.View ? number : string;

export interface Views {
	views: IdArray<Item>;
	current: number;
}

export interface Item {
	id: string;
	type: GuiType;
	name: string;
	moveable: boolean;
	x: number;
	y: number;
	w: number;
	h: number;
	data: { textValue: Option<string | AlignedText>; actions: Option<Option<Actions>[]> };
}

export interface AlignedText {
	horizontal: GuiAlign;
	vertical: GuiAlign;
	text: string;
}

export interface Actions {
	textValue: string | undefined;
	event: Event;
}

export interface Event {
	type: EventType;
	data: EventData<EventType> | undefined;
}
