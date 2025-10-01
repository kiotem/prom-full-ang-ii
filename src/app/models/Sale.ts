import Agent from "./Agent";
import Client from "./Client";
import Project from "./Project";
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
    project: Project;
    saleDate?: Date;
    separationValue: number;
}