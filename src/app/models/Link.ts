export default interface Link {
    id: string;
    name: string;
    concept: string;
    amount_in_cents: number;
    currency: string;
    sku: string;
    active: boolean;
    single_use?: boolean;
    expires_at: string; // Fecha de expiración en formato ISO 8601
    created_at: string; // Fecha de creación en formato ISO 8601
    updated_at: string; // Fecha de última actualización en formato ISO 8601
    payment_url: string; // URL para realizar el pago
    status: 'PENDING' | 'APPROVED' | 'DECLINED' | 'EXPIRED' | 'CANCELLED' | 'ERROR'; // Estado del link de pago
    
}