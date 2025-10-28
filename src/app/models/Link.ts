import Client from "./Client";
import Sale from "./Sale";

export default interface Link 
{
    objectId: string;
    linkId: string;
    currency: string;
    amountInCents: number;
    amount: number;
    platform: string;
    status: string;
    concept: string;
    createdAt: Date;
    expiresAt: { iso: string };
    client: Client;
    sale: Sale;
    propertyId: string;
    propertyCode: string;
    projectName: string;
    email: string;
    active: boolean;
}