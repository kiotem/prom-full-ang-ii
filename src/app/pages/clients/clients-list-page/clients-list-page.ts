import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ClientService } from '../../../services/client-service';

@Component({
  selector: 'app-clients-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent],
  templateUrl: './clients-list-page.html',
  styleUrls: ['./clients-list-page.css', '../../../../styles/reports.css']
})
export class ClientsListPage implements OnInit 
{
  constructor(public clientService: ClientService, private cdr: ChangeDetectorRef) 
  {

  }

  onKeyup(event: KeyboardEvent): void
  {
      console.log('Key pressed:', event.key);
      //this.checkFilter();
  }

  onChangeStatus(event: any): void 
  {
    console.log('Status changed:', event.target.value); 
    //this.checkFilter();
  }

  ngOnInit(): void {
    // Logic to execute on component initialization
    this.getClients({});
  }

  goCreate() {
    // Logic to navigate to the client creation page
  }

    getClients(json: any) {
    this.clientService.getClients(json).subscribe({
      next: (data) => {
        console.log('Clients fetched successfully:', data);
        //this.clients = data.result;
        this.clientService.fill(data.result);
        
        // Then here:
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      }
    });
  }

}
