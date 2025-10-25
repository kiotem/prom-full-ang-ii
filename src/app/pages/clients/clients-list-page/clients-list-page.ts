import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ClientService } from '../../../services/client-service';
import { Router } from '@angular/router';
import { ClientCreateComponent } from '../../../components/client-create-component/client-create-component';
import { displayHTML } from '../../../commons/utils';

@Component({
  selector: 'app-clients-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, ClientCreateComponent],
  templateUrl: './clients-list-page.html',
  styleUrls: ['./clients-list-page.css', '../../../../styles/reports.css']
})
export class ClientsListPage implements OnInit 
{
  constructor(public clientService: ClientService, private cdr: ChangeDetectorRef, private router: Router) 
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
    this.download({});
  }

  download(json: any):void 
  {
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

  showClientCreate(visible: boolean): void {
    displayHTML('client-create-component', visible ? 'block' : 'none');
  }



}
