import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Property from '../models/Property';
import Project from '../models/Project';
import { ProjectService } from './project-service';
import Quota from '../models/Quota';

@Injectable({
  providedIn: 'root'
})
export class PropertyQuoteService 
{
  client: Client;
  property: Property;
  agent: string;
  project: Project;
  quotas: Quota[];

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

    this.quotas = [];
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

  calculateQuotas(): void
  {
    this.quotas = [];
    let dueDate = new Date();
    dueDate.setDate(dueDate.getDate()); // First quota due in 30 days

    let count = 1;

    // Separation quota
    this.quotas.push({
      id: '',
      number: count,
      type: 'Separación',
      amount: this.separationQuotaValue,
      amountPaid: 0,
      amountLate: 0,
      balance: 0,
      dueDate: new Date(),
      paid: false
    });

    count++;

    // Initial quotas
    for (let i = 0; i < this.initialNumberOfQuotasValue; i++) 
    {
      this.quotas.push({
        id: `initial-${i + 1}`,
        number: count,
        type: 'Inicial',
        amount: this.initialQuotaValue,
        amountPaid: 0,
        amountLate: 0,
        balance: this.initialQuotaValue,
        dueDate: new Date(dueDate),
        paid: false
      });
      dueDate.setMonth(dueDate.getMonth() + 1);

      count++;
    }

    for (let i = 0; i < this.finalNumberOfQuotasValue; i++) 
    {
      this.quotas.push({
        id: `ordinaria-${i + 1}`,
        number: count,
        type: 'Ordinaria',
        amount: this.finalQuotaValue,
        amountPaid: 0,
        amountLate: 0,
        balance: this.finalQuotaValue,
        dueDate: new Date(dueDate),
        paid: false
      });
      dueDate.setMonth(dueDate.getMonth() + 1);

      count++;
    }

  }



}