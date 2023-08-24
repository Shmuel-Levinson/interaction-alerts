export type Drug = {
    codes: string[];
    name: string;
    date: Date;
}

export type InteractionAlert = {
    description: string,
    severity: string
}