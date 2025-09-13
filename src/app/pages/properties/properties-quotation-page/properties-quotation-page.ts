import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import ClientSearchInterface, { ClientSearchComponent } from '../../../components/client-search-component/client-search-component';
import Client from '../../../models/Client';
import { ClientCardComponent } from "../../../components/client-card-component/client-card-component";
import { PropertiesQuotationService } from '../../../services/properties-quotation-service';

@Component({
  selector: 'app-properties-quotation-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, ClientSearchComponent, ClientCardComponent, ClientCardComponent],
  templateUrl: './properties-quotation-page.html',
  styleUrls: ['./properties-quotation-page.css' , '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class PropertiesQuotationPage implements OnInit, ClientSearchInterface
{
  constructor(public propertiesQuotationService: PropertiesQuotationService) {}
  selectClient(client: Client): void {
    console.log('Selected client received:', client);
    this.propertiesQuotationService.setClient(client);
  }

  ngOnInit(): void 
  {
    console.log('PropertiesQuotationPage initialized');
  }
  

}
