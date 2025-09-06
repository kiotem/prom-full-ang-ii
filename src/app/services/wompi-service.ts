import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL_WOMPI_TEST, httpWompiOptions } from '../commons/enviroments';
import Order from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class WompiService {
  linkData: any;
  urlApiSandbox: string = 'https://api.sandbox.payouts.wompi.co/v1/'; // URL base para el entorno de pruebas de Wompi

  constructor(private http: HttpClient) 
  {
    // Initialize order if needed
    this.linkData = {};
  }

  createLink(name: String, description: String, amount: number, sku: String) {
    console.log('Create link method called');

    this.linkData = 
    {
        "name": name, // Nombre del link de pago
        "description": description, // Descripción del pago
        "single_use": true, // `false` current caso de que el link de pago pueda recibir múltiples transacciones APROBADAS o `true` si debe dejar de aceptar transacciones después del primer pago APROBADO
        "collect_shipping": false, // Si deseas que el cliente inserte su información de envío current el checkout, o no
        "customer_data": {
            "identification": "", // Número de identificación del cliente (opcional)
            "full_name": "", // Nombre completo del cliente (opcional)
            "email": "" // Email del cliente (opcional)
        },
        "currency": "COP",  //Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
        "amount_in_cents": (amount*100),
        "sku": sku // Si el pago current por un monto especifico, si no lo incluyes el pagador podrá elegir el valor a pagar,
    };

    return this.http.post<Order>(API_URL_WOMPI_TEST+'payment_links', this.linkData, httpWompiOptions);
  }

  getPayouts()
  {
    console.log('Get payouts method called');
    return this.http.get<any[]>(API_URL_WOMPI_TEST+'transactions', httpWompiOptions);
  }

  inactiveLink(linkId: string) 
  {
    console.log('Inactive link method called for linkId:', linkId);
    return this.http.patch<any[]>(API_URL_WOMPI_TEST + 'payment_links/' + linkId, { active: true }, httpWompiOptions);
  }

}
