import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Project from '../models/Project';
import Property from '../models/Property';
import Agent from '../models/Agent';
import Quota from '../models/Quota';
import { ProjectService } from './project-service';

@Injectable({
  providedIn: 'root'
})
export class PropertiesQuotationService {
  client: Client;
  project: Project;
  property: Property;
  agent: string;
  quotas: Quota[];
  saleId: string;
  wompiResponse: any;

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
    this.saleId = '';
    this.wompiResponse = {}

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

    this.quotas = [];
  }

  reset()
  {
    this.saleId = '';
    this.wompiResponse = {}

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

    this.quotas = [];
  }

  setClient(client: Client): void {
    this.client = client;
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
