export type Option<T> = T | null;

export interface Data {
	views: View[];
	current: number;
}

export interface View {
	data: MessageData | AlertData | BrowserData | InputData | any;
	// not to serialize
	type: GuiType;
}

export enum GuiType {
	Dialog = 'Dialog',
	Alert = 'Alert',
	Browser = 'Browser',
	Input = 'Input'
}

export interface MessageData {
	header: Option<Label>;
	text: Option<Label>;
	buttons: Option<Event>[];
	back_function: string;
}

export interface AlertData {
	text: string;
	function: string;
	back_function: string;
}

export interface BrowserData {}

export interface InputData {}

export interface Event {
	text: string;
	function: string;
}

export interface Label {
	text: String;
	x: number;
	y: number;
	horizontal: Align;
	vertical: Align;
}

export enum Align {
	Left = 'Left',
	Right = 'Right',
	Top = 'Top',
	Bottom = 'Bottom',
	Center = 'Center'
}

export interface Event {
	text: string;
	function: string;
}
