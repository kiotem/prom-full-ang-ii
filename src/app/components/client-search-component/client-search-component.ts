import { ChangeDetectorRef, Component, EventEmitter, input, OnInit, Output, output } from '@angular/core';
import { LoaderService } from '../../services/loader-service';
import { ClientService } from '../../services/client-service';
import { displayHTML, getTextFromField } from '../../commons/utils';
import { ClientCardComponent } from "../client-card-component/client-card-component";
import Client from '../../models/Client';
import { Router } from '@angular/router';

export default interface ClientSearchInterface {
  selectClient(client: Client): void;
  cancelSearchClient(): void;
}


@Component({
  selector: 'app-client-search-component',
  imports: [ClientCardComponent],
  templateUrl: './client-search-component.html',
  styleUrl: './client-search-component.css'
})
export class ClientSearchComponent implements OnInit 
{
  @Output() selectAction = new EventEmitter<Client>();
  @Output() cancelAction = new EventEmitter<void>();

  constructor(private loaderService: LoaderService, public clientService: ClientService, private cdr: ChangeDetectorRef, private router: Router) {
    console.log('CustomerSearchComponent initialized');
    this.clientService.clients = [];
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
        this.search();
      }
    }
  }

  onChangeStatus(event: any) {
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

  triggerSelectAction(client: Client) {
    console.log('Client selected:', client);
    displayHTML('client-search-component','none');
    this.selectAction.emit(client);
  }

  triggerCancelAction() {
    console.log('Cancel action triggered');
    displayHTML('client-search-component','none');
    //this.cancelAction.emit();
  }

  doCreateNewClient() {
    console.log('Create new client action triggered');
    // Implement the logic to create a new client
  } 

  doCancel() {
    console.log('Cancel action triggered');
    this.router.navigate(['/dashboard']);
    //displayHTML('client-search-component','none');
  }
}