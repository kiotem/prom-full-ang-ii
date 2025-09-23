import Agent from "./Agent";
import Client from "./Client";
import Property from "./Property";

export default interface Sale 
{
    objectId: string;
    createdAt: Date;
    updatedAt?: Date;
    agent: Agent;
    amount: number;
    balance: number;
    client: Client;
    discountPercent?: number;
    discountValue?: number;
    finalQuota?: number;
    finalNumberOfQuotas?: number;
    finalValue?: number;
    initialQuota?: number;
    initialNumberOfQuotas?: number;
    initialValue?: number;
    initialPercent?: number;
    phase?: string;
    phaseType?: string;
    property: Property;
    saleDate?: Date;
    separationValue: number;

    /*
    objectId: string;
    createdAt: Date;
    limitDate?: Date;
    defaultRate?: number;
    saleDate?: Date;
    amount?: number;
    comments?: string;
    status?: string;
    phase?: string;
    separationValue?: number;
    initialValue?: number;
    initialNumberOfQuotas?: number;
    initialQuota?: number;
    finalValue?: number;
    finalNumberOfQuotas?: number;
    finalQuota?: number;
    balance?: number;
    agentId?: string;
    clientId?: string;
    propertyId?: string;*/
}