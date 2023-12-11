// Typescript types for the app

type CommonFields = {
    id?: string;
    created_at?: string;
};

export const CampaignStatusArray = ['Draft', 'Sent', 'Archived'];
export const EmailStatusArray = ['Draft', 'Completed'];
export const SubscriberStatusArray = ['Active', 'Inactive','Completed'];

type CampaignStatus = typeof CampaignStatusArray[number];
type EmailStatus = typeof EmailStatusArray[number];
type SubscriberStatus = typeof SubscriberStatusArray[number];

export type Campaign = {
    name: string;
    from: string | undefined;
    subject: string | undefined;
    user_id: string | undefined;
    email_id: string | undefined;
    status: CampaignStatus | undefined;
} & CommonFields;

export type Email = {
    title: string;
    content: string | undefined;
    subject?: string | undefined;
    user_id?: string | undefined;
    email_id?: string | undefined;
    status?: EmailStatus | undefined;
} & CommonFields;

export type Subscriber = {
    email: string;
    owner_id: string | undefined;
    status: SubscriberStatus | undefined;
} & CommonFields;

export type User = {
    dark_mode: boolean;
    email: string;
} & CommonFields;