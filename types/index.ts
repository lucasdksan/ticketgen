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

export type SignInState = {
    success: boolean;
    user: { name: string; email: string } | null;
    errors: Record<string, string[] | undefined> | null;
    message: string;
};

export type SignUpState = {
    success: boolean;
    user: { name: string; email: string } | null;
    errors: Record<string, string[] | undefined> | null;
    message: string;
};

export type CreateEventState = {
    success: boolean;
    errors: Record<string, string[] | undefined> | null;
    message: string;
};

export interface EventTemplate {
    link: string;
    name: string;
    attendant: string;
    userId: number;
    id: number;
    categories: Category[];
    createdAt: Date;
    updatedAt: Date;
}

export type Category = {
    name: string;
    id: number;
    count: number;
    createdAt: Date;
    updatedAt: Date;
    eventTemplateId: number;
}
