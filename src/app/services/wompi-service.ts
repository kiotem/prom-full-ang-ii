import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, API_URL_WOMPI_TEST, httpOptions, httpWompiOptions } from '../commons/enviroments';
import Order from '../models/Order';

@Injectable({
  providedIn: 'root'
})
export class WompiService {
  linkData: any;
  //urlApiSandbox: string = 'https://api.sandbox.payouts.wompi.co/v1/'; // URL base para el entorno de pruebas de Wompi

  constructor(private http: HttpClient) 
  {
    // Initialize order if needed
    this.linkData = {};
  }

  createLink(name: String, description: String, amount: number, sku: String, callback : (sucess: boolean, linkResponse: any) => void) {
    console.log('Create link method called');

    let expirationDate = new Date();
    expirationDate.setHours(expirationDate.getHours() + 48);

    let expires_at = expirationDate.toISOString();

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
        "expires_at": expires_at, // Fecha de expiración del link de pago en formato ISO 8601 (YYYY-MM-DDTHH:MM:SSZ)
        "currency": "COP",  //Únicamente está disponible pesos colombianos (COP) current el momento. En el futuro soportaremos mas monedas
        "amount_in_cents": (amount*100),
        "sku": sku 
    };

    this.http.post<any>(API_URL_WOMPI_TEST+'payment_links', this.linkData, httpWompiOptions).subscribe(
      (linkResponse) => 
      {
        console.log('Wompi sent successfully!', linkResponse);
        callback(true, linkResponse);
      },
      (error) => {
        console.error('Error creating Wompi link:', error);
        callback(false, error);
      }
    );

    //return this.http.post<Order>(API_URL_WOMPI_TEST+'payment_links', this.linkData, httpWompiOptions);
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
