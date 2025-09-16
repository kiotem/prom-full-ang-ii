import { Component } from '@angular/core';
import { PropertiesQuotationService } from '../../services/properties-quotation-service';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-property-quote-card-component',
  imports: [DecimalPipe],
  templateUrl: './property-quote-card-component.html',
  styleUrls: ['./property-quote-card-component.css', '../../../styles/reports.css']
})
export class PropertyQuoteCardComponent {
  constructor(public propertiesQuotationService: PropertiesQuotationService) {
  {
    console.log('PropertyQuoteCardComponent initialized');
  }
  }
}

