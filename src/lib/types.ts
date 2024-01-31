export type Option<T> = T | null;

export enum GuiType {
	Header = 0,
	BodyText,
	Buttons,
	Alert
}

export enum Align {
	Left = 0,
	Right,
	Top,
	Bottom,
	Center
}

export function alignToString(align: Align | string): string {
	switch (align) {
		case Align.Left:
			return 'Left';
		case Align.Right:
			return 'Right';
		case Align.Top:
			return 'Top';
		case Align.Bottom:
			return 'Bottom';
		case Align.Center:
			return 'Center';
		default:
			throw new Error('Invalid Align value');
	}
}

export type Event =
	| {
			View: number;
	  }
	| {
			Function: string;
	  };

export interface Views {
	pages: Page[];
	current: number;
}

export interface Page {
	id: string;
	page: View[];
}

export interface View {
	id: string;
	name: string;
	type: GuiType;
	moveable: boolean;
	x: number;
	y: number;
	w: number;
	h: number;
	data: Data;
}

export interface Data {
	text_value: Option<String>;
	horizontal: Option<Align>;
	vertical: Option<Align>;
	actions: Option<Option<Action>[]>;
}

export interface Action {
	text_value: String;
	event: Event;
}
