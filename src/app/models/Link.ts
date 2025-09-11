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
    created_at?: string; // Fecha de creación en formato ISO 8601
    updated_at?: string; // Fecha de última actualización en formato ISO 8601
    payment_url?: string; // URL para realizar el pago
    status: 'pending' | 'approved' | 'declined' | 'expired' | 'cancelled' | 'error'; // Estado del link de pago
    propertyID?: string;
    clientName?: string;
    clientEmail?: string;
    clientPmsId?: string;
    propertyCode?: string;
    projectName?: string;
    platform?: string; // Plataforma desde la cual se creó el link (ej. 'Stripe', 'PayPal', etc.)
    linkID?: string; // ID del link de pago en la plataforma de pagos

}