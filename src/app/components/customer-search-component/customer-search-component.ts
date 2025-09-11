import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { getTextFromField } from '../../commons/utils';
import { LoaderComponent } from '../loader-component/loader-component';
import { LoaderService } from '../../services/loader-service';
import { ClientService } from '../../services/client-service';
import { PropertyQuoteService } from '../../services/property-quote-service';

@Component({
  selector: 'app-customer-search-component',
  imports: [LoaderComponent],
  templateUrl: './customer-search-component.html',
  styleUrl: './customer-search-component.css'
})
export class CustomerSearchComponent implements OnInit {

  constructor(private loaderService: LoaderService,
              private clientService: ClientService,
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
        //this.getClientByPms({ search: searchValue });
      }
    }
  }

  onChangeStatus(event: any) {
    console.log(event.target.value);
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
    
          //this.cdr.detectChanges();
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