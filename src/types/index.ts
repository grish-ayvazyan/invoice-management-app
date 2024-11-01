export enum InvoiceStatus {
    Pending = "Pending",
    Paid = "Paid",
    Cancelled = "Cancelled",
}

export enum EmailFrequency {
    Daily = "Daily",
    Weekly = "Weekly",
    Monthly = "Monthly",
    Custom = "Custom",
}

export type IProject = {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
};

export type IScheduledEmail = {
    recipientEmail: string;
    subject: string;
    body: string;
    frequency: EmailFrequency;
    nextSendDate?: Date;
};

export type IInvoice = {
    id: string;
    projectId: string;
    date: Date;
    amount: number;
    status: InvoiceStatus;
    scheduledEmail?: IScheduledEmail;
};
