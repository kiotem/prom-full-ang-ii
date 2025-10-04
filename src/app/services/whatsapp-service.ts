import { Injectable } from '@angular/core';
import WhatsApp from '../models/WhatsApp';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from '../commons/enviroments';
import Sale from '../models/Sale';

@Injectable({
  providedIn: 'root'
})
export class WhatsAppService {
  whatsapp: WhatsApp;

  constructor(private http: HttpClient) {
    // Initialize WhatsApp object if needed
    this.whatsapp = 
    {
      phone: '',
      body: '',
      template: '',
      name: '',
      arg1: undefined,
      arg2: undefined,
      arg3: undefined 
    };
  }

  sendMessageSeparation(data: WhatsApp) 
  {
    console.log('Send message method called');
    this.whatsapp = data;

    // Implement login logic here
    console.log('Login method called');
    return this.http.post<WhatsApp>(API_URL+'sendWhatsAppSeparation', data, httpOptions)
  }

  sendMessageSeparationPlan(data: WhatsApp) 
  {
    console.log('Send message method called: '+data); 
    this.whatsapp = data;

    return this.http.post<WhatsApp>(API_URL+'sendWhatsAppSeparationPlan', data, httpOptions)
  }

  sendAccountStatus(sale: Sale, callback: (success: boolean) => void) {
    let data: WhatsApp = {
      //phone: this.propertyQuoteService.client.phone,
      phone: '3156738411',
      body: '',
      template: 'separation_plan',
      name: sale!.client.name,
      arg1: sale!.property.code+' de '+sale!.project.name,
      arg2: 'fl_'+sale!.objectId+'.pdf'
    };

    console.log('Send account status method called: '+data);
    this.http.post<WhatsApp>(API_URL+'sendWhatsAppAccountStatus', data, httpOptions).subscribe(
      (response) => 
      {
        console.log('WhatsApp message sent successfully!', response);
        callback(true);
      },
      (error) => {
        console.error('Error sending WhatsApp message:', error);
        callback(false);
      }
    );
  }
}
