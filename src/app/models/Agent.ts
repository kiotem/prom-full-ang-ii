export default interface Agent{
    objectId: string;
    pmsId: string;
    name: string;
    lastName1: string;
    lastName2: string;
    email: string;
    phone: string;
    agentType: string;
    projects?: any[];
    address?: string;
    city?: string;
    status?: string;
}