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
    
    /*
    metadata?: Record<string, any>; // Optional additional data
    expiresAt?: Date; // Optional expiration date for the order
    transactionId?: string; // Optional transaction ID if payment is processed
    notes?: string; // Optional notes or comments about the order*/
 // Optional array of items in the order
}