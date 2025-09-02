import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { PropertyQuoteService } from '../../../services/property-quote-service';
import { ClientService } from '../../../services/client-service';
import { LoaderService } from '../../../services/loader-service';
import Project from '../../../models/Project';
import { ProjectService } from '../../../services/project-service';
import { PropertyService } from '../../../services/property-service';
import Property from '../../../models/Property';
import { PropertyCardComponent } from '../../../components/property-card-component/property-card-component';

@Component({
  selector: 'app-properties-quote-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, PropertyCardComponent],
  templateUrl: './properties-quote-page.html',
  styleUrls: ['./properties-quote-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class PropertiesQuotePage implements OnInit 
{
  selectedProject: Project | undefined;
  meterValue: number = 0;
  constructor(public propertyQuoteService: PropertyQuoteService, private clientService: ClientService, public loaderService: LoaderService, public cdr: ChangeDetectorRef, public projectService: ProjectService, public propertyService: PropertyService) 
  {

  }

  ngOnInit(): void 
  {
    this.selectedProject = this.projectService.getSelected();
    this.meterValue = this.selectedProject?.meterValue || 0;
    this.propertyService.clear();
    this.cdr.detectChanges();
    //this.checkFilter();
  }

  onKeydownClient(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const searchValue = (event.target as HTMLInputElement).value;
      // Implement search logic here
      const json = { search: searchValue };
      this.getClientByPms(json);
    }
  }

  onKeyUpProperty(event: KeyboardEvent): void {
    const searchValue = (event.target as HTMLInputElement).value;
    let jsonSearch: any = {project: this.selectedProject!.objectId};

    if(searchValue)
    {
      //jsonSearch = {project: this.selectedProject!.objectId, search: searchValue};
    }

    this.checkFilter();
  }

    onPropertyClick(property: Property): void 
    {
      /*
        console.log('Property clicked:', property);
        this.propertyToSeparate = property;

        this.propertyId.setValue(property.objectId);
        this.propertyAmount.setValue(property.amount);

        const panel_property_info = document.getElementById('panel-property-info');
        if (panel_property_info) {
          panel_property_info.style.display = 'block';
        }

        const panel_separation = document.getElementById('panel-separation');
        if (panel_separation) {
          panel_separation.style.display = 'block';
        }

        this.calculateFinalValues();
      */
    }

  getClientByPms(json: any) {
  console.log('getClientByPms called with Pre:', json);
      this.loaderService.show();

      this.clientService.getByPms(json).subscribe({
      next: (data) => {
        this.loaderService.hide();

        try{

        console.log('ClientsByPms fetched successfully:', data);

        const panel_client_name = document.getElementById('panel-client-name');
        const panel_customer_empty = document.getElementById('panel-client-empty');

        if(data.result.length == 0) 
        {
          panel_client_name!.style.display = 'none';
          panel_customer_empty!.style.display = 'block';
        }else
        {
          this.propertyQuoteService.setClient(data.result[0]); // Set the client in the service
          panel_client_name!.style.display = 'block';
          panel_customer_empty!.style.display = 'none';

          const panel_input_search = document.getElementById('panel-input-search');
          if (panel_input_search) 
          {
            panel_input_search.style.display = 'block';

            const i_search_property = document.getElementById('i_search_property');
            if (i_search_property) 
            {
              (i_search_property as HTMLInputElement).focus();
            }
          }

          this.checkFilter();
        }
        
        this.cdr.detectChanges();
        /*
        if(this.client) 
          {
            this.clientId.setValue(this.client.objectId);
            if (panel_customer) {
              panel_customer.style.display = 'block';
            }

            if (panel_customer_empty) {
              panel_customer_empty.style.display = 'none';
            }

            const panel_input_search = document.getElementById('panel-input-search');
            if (panel_input_search) {
              panel_input_search.style.display = 'block';

              const i_search_property = document.getElementById('i_search_property');
              if (i_search_property) {
                (i_search_property as HTMLInputElement).focus();
              }
            }


            this.cdr.detectChanges();

            //this.checkFilter();
        }else
        {
            if (panel_customer) 
            {
              panel_customer.style.display = 'none';
            }

            if (panel_customer_empty) 
            {
              panel_customer_empty.style.display = 'block';
            }
        }*/
      }catch (error) 
      {
        console.error('Error processing client data:', error);
      }
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Error fetching clients:', error);
      }
    });
  }

  checkFilter(): void{
    
    if (this.selectedProject) 
      {
      let jsonSearch: any = {project: this.selectedProject.objectId};

      let i_search_property = document.getElementById('i_search_property');
      

      if (i_search_property) {
        let searchValue = (i_search_property as HTMLInputElement).value.toUpperCase();
        jsonSearch = {project: this.selectedProject.objectId, search: searchValue, status: "Libre"}
      }

      this.getProperties(jsonSearch);
    }
  }

    getProperties(json: any) {
    this.propertyService.getProperties(json).subscribe({
      next: (data) => {
        console.log('Properties fetched successfully:', data);

        this.propertyService.setData(data.result);

        let size = this.propertyService.properties.length;

        for(let i = 0; i < size; i++) {
          this.propertyService.properties[i].amount = this.propertyService.properties[i].area * this.meterValue; // Example calculation
        }

        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching properties:', error);
      }
    });
  }

}
