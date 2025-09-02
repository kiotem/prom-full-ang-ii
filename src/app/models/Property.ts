export default interface Property 
{
    objectId: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    area: number;
    status?: string;
    project: { objectId: string } | any;
    propertiesGroup?: string;
    coordinates?: { latitude: number; longitude: number } | any;
    propertiesNumber: number;
    code?: string;
    levels?: number;
    address?: string;
    builtUpArea?: number;
    floors?: number;
    width?: number;
    depth?: number;
    agent?: string;
    agentData?: any[];
    amount: number;
}