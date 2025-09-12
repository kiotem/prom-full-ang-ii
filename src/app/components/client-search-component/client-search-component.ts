import { ChangeDetectorRef, Component, input, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader-service';
import { ClientService } from '../../services/client-service';
import { PropertyQuoteService } from '../../services/property-quote-service';
import { getTextFromField } from '../../commons/utils';
import { ClientCardComponent } from "../client-card-component/client-card-component";
import Client from '../../models/Client';

export default interface ClientSearchComponentInterface {
  selectClient(client: Client): void;
}

@Component({
  selector: 'app-client-search-component',
  imports: [ClientCardComponent],
  templateUrl: './client-search-component.html',
  styleUrl: './client-search-component.css'
})
export class ClientSearchComponent implements OnInit 
{
  constructor(private loaderService: LoaderService,
              public clientService: ClientService,
              private propertyQuoteService: PropertyQuoteService,
              private cdr: ChangeDetectorRef) {
    console.log('CustomerSearchComponent initialized');
  }

  ngOnInit(): void {
    console.log('CustomerSearchComponent initialized');
  }

  onKeyup(event: any) {
    console.log(event.target.value);
    if (event.key === 'Enter') 
    {
      const searchValue = (event.target as HTMLInputElement).value;
      if(searchValue.length > 2)
      {
        console.log('Enter key pressed with search value:', searchValue);
        this.search();
      }
    }
  }

  onChangeStatus(event: any) {
    console.log(event.target.value);
    this.search();
  }

  search() {
    let searchValue = getTextFromField('i_search_client');
    let searchField = getTextFromField('s_status_field');

    let json = {
      search: searchValue,
      field: searchField
    };

    console.log('getClientBy called with Pre:', json);
        this.loaderService.show();
  
    this.clientService.getBy(json).subscribe({
      next: (data) => {
        this.loaderService.hide();

        try
        {
          console.log('ClientsBy fetched successfully:', data);
          //this.checkFilter();
          this.clientService.fill(data.result);
  
          this.cdr.detectChanges();
        }catch(error) 
        {
          console.error('Error processing client data:', error);
        }
      },
      error: (error) => 
      {
        this.loaderService.hide();
        console.error('Error fetching clients:', error);
      }
    }); 
  } 
}