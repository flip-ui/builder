export type Option<T> = T | null;

export interface Data {
    views: View[];
    current: number;
}

export interface View {
    data: MessageData | InputData | BrowserData | any;
    // not to serialize
    type: GuiType;
}

export enum GuiType {
    Dialog = "Dialog",
    Alert = "Alert",
    Browser = "Browser",
    Input = "Input"
}

export interface MessageData {
    header: Option<Label>,
    text: Option<Label>,
    buttons: Option<Event>[],
}

export interface Label {
    text: String,
    x: number,
    y: number,
    horizontal: Align,
    vertical: Align,
}

export enum Align {
    Left,
    Right,
    Top,
    Bottom,
    Center,
}

export interface Event {
    text: string;
    function: string;
}

export interface InputData {
}

export interface BrowserData {
}