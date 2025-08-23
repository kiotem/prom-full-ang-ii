export default interface WhatsApp 
{   
    phone: string;
    body: string;
    template: string;
    name: string;
    arg1?: string; // Optional argument for additional data
    arg2?: string; // Optional argument for additional data
    arg3?: string; // Optional argument for additional data
}