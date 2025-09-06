import { Injectable } from '@angular/core';
import WhatsApp from '../models/WhatsApp';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from '../commons/enviroments';

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
}
