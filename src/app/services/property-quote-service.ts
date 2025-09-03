import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Property from '../models/Property';
import Project from '../models/Project';
import { ProjectService } from './project-service';

@Injectable({
  providedIn: 'root'
})
export class PropertyQuoteService 
{
  client: Client;
  property: Property;
  agent: string;
  project: Project;

  separationQuotaValue: number = 1000000;
  initialPercentValue: number = 30;
  initialBalanceValue: number = 0;
  initialNumberOfQuotasValue: number = 6;
  initialQuotaValue: number = 0;
  finalBalanceValue: number = 0;
  finalNumberOfQuotasValue: number = 36;
  finalQuotaValue: number = 0;

  constructor(private projectService: ProjectService) 
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

    this.project = this.projectService.getSelected() as Project;
  }

  setClient(client: Client): void
  {
    this.client = client;
  }

  setProperty(property: Property): void
  {
    this.property = property;
  }

  calculate(): void
  {
    // Implement your calculation logic here
    this.initialBalanceValue = (this.property.amount * (this.initialPercentValue / 100)) - this.separationQuotaValue;

    this.finalBalanceValue = this.property.amount -  this.initialBalanceValue - this.separationQuotaValue;

    this.initialQuotaValue = Math.floor(this.initialBalanceValue / this.initialNumberOfQuotasValue);

    this.finalQuotaValue = Math.floor(this.finalBalanceValue / this.finalNumberOfQuotasValue);

  }

}
