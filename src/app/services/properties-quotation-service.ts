import { Injectable } from '@angular/core';
import Client from '../models/Client';
import Project from '../models/Project';
import Property from '../models/Property';
import Agent from '../models/Agent';
import Quota from '../models/Quota';
import { ProjectService } from './project-service';
import { formatDate } from '@angular/common';
import Sale from '../models/Sale';

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

  sale: Sale | undefined;

  separationForm: any;

  separationQuotaValue: number = 1000000;
  initialPercentValue: number = 30;
  initialBalanceValue: number = 0;
  initialNumberOfQuotasValue: number = 6;
  initialQuotaValue: number = 0;
  finalBalanceValue: number = 0;
  finalNumberOfQuotasValue: number = 36;
  finalQuotaValue: number = 0;
  discountValue: number = 0;
  discountPercentValue: number = 0;

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

    this.sale = undefined;
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
    let amount = this.property.amount;

    this.discountValue = Math.floor(amount * (this.discountPercentValue / 100));

    amount = amount - this.discountValue;

    this.initialBalanceValue = (amount * (this.initialPercentValue / 100)) - this.separationQuotaValue;

    this.finalBalanceValue = amount -  this.initialBalanceValue - this.separationQuotaValue;

    this.initialQuotaValue = Math.floor(this.initialBalanceValue / this.initialNumberOfQuotasValue);

    this.finalQuotaValue = Math.floor(this.finalBalanceValue / this.finalNumberOfQuotasValue);

    this.calculateQuotas();
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
      dueDate: new Date(dueDate),
      dueDateString: formatDate(new Date(dueDate), 'dd/MM/yyyy', 'en-US'),
      paid: false
    });

    dueDate.setMonth(dueDate.getMonth() + 1);

    count++;

    // Initial quotas
    for (let i = 0; i < this.initialNumberOfQuotasValue; i++) 
    {
      this.quotas.push({
        id: `initial-${i + 1}`,
        number: count,
        type: 'Inicial '+(i + 1),
        amount: this.initialQuotaValue,
        amountPaid: 0,
        amountLate: 0,
        balance: this.initialQuotaValue,
        dueDate: new Date(dueDate),
        dueDateString: formatDate(new Date(dueDate), 'dd/MM/yyyy', 'en-US'),
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
        type: 'Ordinaria '+(i + 1),
        amount: this.finalQuotaValue,
        amountPaid: 0,
        amountLate: 0,
        balance: this.finalQuotaValue,
        dueDate: new Date(dueDate),
        dueDateString: formatDate(new Date(dueDate), 'dd/MM/yyyy', 'en-US'),
        paid: false
      });
      dueDate.setMonth(dueDate.getMonth() + 1);

      count++;
    }
  }

  getJsonWhatsApp(): {}
  {
    return {
      objectId: this.saleId,
      amount: this.separationQuotaValue,
      propertyId: this.property.objectId,
      clientName: this.client.name+' '+this.client.lastName1,
      clientPmsId: this.client.pmsId,
      clientPhone: this.client.phone,
      clientEmail: this.client.email,
      propertyCode: this.property.code,
      projectName: this.project.name
    }
  }

}
