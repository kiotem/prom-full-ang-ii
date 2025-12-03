import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ClientService } from '../../../services/client-service';
import { Router } from '@angular/router';
import { ClientCreateComponent } from '../../../components/client-create-component/client-create-component';
import { displayHTML } from '../../../commons/utils';
import Swal from 'sweetalert2';
import Client from '../../../models/Client';

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

clientCreated(client: Client): void {
    console.log('Client created event received in ClientsListPage', client);
    //this.download({});

    this.download({});
    this.showClientCreate(false);
    this.cdr.detectChanges();
    
    Swal.fire({
      icon: 'success',
      title: 'Proceso exitoso',
      text: '¡Cliente creado exitosamente!',
      confirmButtonText: 'OK'
    });
  }

  confirmDeleteClient(client: Client): void {
    Swal.fire({
      title: '¿Eliminar cliente?',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Nombre:</strong> ${client.name} ${client.lastName1} ${client.lastName2}</p>
          <p><strong>Documento:</strong> ${client.pmsId}</p>
          <p><strong>Email:</strong> ${client.email}</p>
        </div>
        <p style="color: #e74c3c; font-weight: 500;">Esta acción no se puede deshacer.</p>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteClient(client);
      }
    });
  }

  deleteClient(client: Client): void {
    // Aquí iría la lógica real para eliminar el cliente
    // Por ejemplo: this.clientService.deleteClient(client.objectId)
    
    // Simulación de eliminación exitosa
    console.log('Eliminando cliente:', client);
    
    // Mostrar confirmación de eliminación
    Swal.fire({
      icon: 'success',
      title: 'Cliente eliminado',
      text: 'El cliente ha sido eliminado exitosamente.',
      confirmButtonText: 'OK',
      timer: 2000,
      timerProgressBar: true
    }).then(() => {
      // Recargar la lista después de eliminar
      this.download({});
    });
  }

}
