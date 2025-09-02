import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Property from '../models/Property';

@Injectable({
  providedIn: 'root'
})
export class PropertyQuoteService 
{
  client: Client;
  property: Property;
  agent: string;

  constructor() 
  {
    this.client = 
    {
      objectId: '',
      name: '',
      lastName1: '',
      lastName2: '',
      email: '',
      phone: '',
      pmsId: '',
      agent: ''
    };

    this.property = 
    {
      objectId: '',
      address: '',
      name: '',
      code: '',
      area: 0,
      project: { objectId: '' },
      propertiesNumber: 0,
      amount: 0
    };

    this.agent = '';
  }

  setClient(client: Client): void
  {
    this.client = client;
  }

  setProperty(property: Property): void
  {
    this.property = property;
  }

}
