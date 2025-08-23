export default interface Sale 
{
    objectId: string;
    createdAt: Date;
    /*client: { objectId: string; className: "Clients" };
    property?: { objectId: string; className: "Properties" };*/
    limitDate?: Date;
    defaultRate?: number;
    saleDate?: Date;
    amount?: number;
    comments?: string;
    status?: string;
    phase?: string;
    //agent: { objectId: string; className: "Agents" };
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
    propertyId?: string;
}