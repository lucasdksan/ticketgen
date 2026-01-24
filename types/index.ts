export interface Ticket {
    number: number;
    timestamp: Date;
}

export interface SessionData {
    userName: string;
    eventName: string;
    startTime: Date;
    tickets: Ticket[];
}

export enum AppState {
    SETUP = "SETUP",
    ACTIVE = "ACTIVE",
    SUMMARY = "SUMMARY"
}
