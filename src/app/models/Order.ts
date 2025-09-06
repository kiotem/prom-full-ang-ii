import Quota from "./Quota";

export default interface Order {
    objectId: string;
    code: string;
    description: string;
    amount: number;
    currency: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string; // Reference to User
    project: string; // Reference to Project
    property: string; // Reference to Property
    paymentMethod: string; // e.g., 'credit_card', 'paypal'
    paymentStatus: string; // e.g., 'pending', 'completed', 'failed'
}