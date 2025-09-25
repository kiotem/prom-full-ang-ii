import { ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { getNumberFromField } from '../../commons/utils';
import { AgentService } from '../../services/agent-service';

@Component({
  selector: 'app-property-quote-form-component',
  imports: [ReactiveFormsModule],
  templateUrl: './property-quote-form-component.html',
  styleUrls: ['./property-quote-form-component.css', '../../../styles/forms.css']
})
export class PropertyQuoteFormComponent implements OnInit {
  @Output() generateQuotasAction = new EventEmitter<any>();

  separationForm: FormGroup;
  separationQuota: FormControl;
  discountPercent: FormControl;
  discountValue: FormControl;
  initialPercent: FormControl;
  initialBalance: FormControl;
  initialNumberOfQuotas: FormControl;
  initialQuota: FormControl;
  finalBalance: FormControl;
  finalNumberOfQuotas: FormControl;
  finalQuota: FormControl;
  agentId: FormControl;
  clientId: FormControl;
  propertyId: FormControl;
  propertyAmount: FormControl;
  quotas : FormControl;


constructor(public propertiesQuotationService: PropertiesQuotationService, private cdr: ChangeDetectorRef, public agentService: AgentService) 
{
    this.separationQuota = new FormControl(1000000);
    this.discountPercent = new FormControl(0);
    this.discountValue = new FormControl(0);
    this.initialBalance = new FormControl(0);
    this.initialPercent = new FormControl(30);
    this.initialNumberOfQuotas = new FormControl(6);
    this.initialQuota = new FormControl(0);
    this.finalBalance = new FormControl(0);
    this.finalNumberOfQuotas = new FormControl(36);
    this.finalQuota = new FormControl(0);
    this.agentId = new FormControl('');
    this.clientId = new FormControl('');
    this.propertyId = new FormControl('');  
    this.propertyAmount = new FormControl('');
    this.quotas = new FormControl([]);

    this.separationForm = new FormGroup({
      separationQuota: this.separationQuota,
      discountPercent: this.discountPercent,
      discountValue: this.discountValue,
      initialPercent: this.initialPercent,
      initialBalance: this.initialBalance,
      initialNumberOfQuotas: this.initialNumberOfQuotas,
      initialQuota: this.initialQuota,
      finalBalance: this.finalBalance,
      finalNumberOfQuotas: this.finalNumberOfQuotas,
      finalQuota: this.finalQuota,
      agentId: this.agentId,
      clientId: this.clientId,
      propertyId: this.propertyId,
      propertyAmount: this.propertyAmount,
      quotas: this.quotas
      });

      this.getAgents({});
  }
  ngOnInit(): void {
    
  }


  process(): boolean
  {
    this.clientId.setValue(this.propertiesQuotationService.client.objectId);
    this.propertyId.setValue(this.propertiesQuotationService.property.objectId);
    this.propertyAmount.setValue(this.propertiesQuotationService.property.amount);
    this.agentId.setValue(this.propertiesQuotationService.agent);

    this.quotas.setValue(this.propertiesQuotationService.quotas);
    this.propertiesQuotationService.separationQuotaValue = getNumberFromField('iSeparationQuota');
    this.propertiesQuotationService.discountPercentValue = getNumberFromField('iDiscountPercent');
    this.propertiesQuotationService.initialPercentValue = getNumberFromField('iInitialPercent');
    this.propertiesQuotationService.initialNumberOfQuotasValue = getNumberFromField('iInitialNumberOfQuotas');
    this.propertiesQuotationService.finalNumberOfQuotasValue = getNumberFromField('iFinalNumberOfQuotas');

    if(this.propertiesQuotationService.initialPercentValue < 0 || this.propertiesQuotationService.initialPercentValue > 100)
    {
      alert('El porcentaje de cuota inicial debe estar entre 0 y 100');
      return false;
    }

    this.propertiesQuotationService.calculate();

    this.discountValue.setValue(this.propertiesQuotationService.discountValue);
    this.initialBalance.setValue(this.propertiesQuotationService.initialBalanceValue);
    this.initialQuota.setValue(this.propertiesQuotationService.initialQuotaValue);
    this.finalBalance.setValue(this.propertiesQuotationService.finalBalanceValue);
    this.finalQuota.setValue(this.propertiesQuotationService.finalQuotaValue);

    this.propertiesQuotationService.separationForm = this.separationForm;

    this.quotas.setValue(this.propertiesQuotationService.quotas);

    this.cdr.detectChanges();
    
    return true;
  }

  getAgents(json: any) {
    this.agentService.getAgents(json).subscribe({
      next: (data) => {
        console.log('Agents fetched successfully:', data);
        this.agentService.fill(data.result);
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching agents:', error);
      }
    });
  }

  generateQuotas(): void {
    this.generateQuotasAction.emit({});
  }
  
}
