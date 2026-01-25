export interface Ticket {
    number: number;
    timestamp: Date;
}

export interface CategoryCount {
    name: string;
    count: number;
}

export interface SessionData {
    userName: string;
    eventName: string;
    startTime: Date;
    mode: SessionMode;
    tickets?: Ticket[];
    categories?: CategoryCount[];
}

export enum AppState {
    SETUP = "SETUP",
    ACTIVE = "ACTIVE",
    SUMMARY = "SUMMARY"
}

export enum SessionMode {
    TICKETS = "TICKETS",
    CATEGORIES = "CATEGORIES"
}
