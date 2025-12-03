import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectService } from '../../../services/project-service';
import { PropertyService } from '../../../services/property-service';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { LoaderComponent } from "../../../components/loader-component/loader-component";
import { LoaderService } from '../../../services/loader-service';
import { Router } from '@angular/router';
import { PropertyCreateComponent } from "../../../components/property-create-component/property-create-component";
import { displayHTML } from '../../../commons/utils';
import Property from '../../../models/Property';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-properties-list-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, PropertyCreateComponent],
  templateUrl: './properties-list-page.html',
  styleUrls: ['./properties-list-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})


export class PropertiesListPage implements OnInit
{
  constructor(public router: Router, public propertyService: PropertyService, private cdr: ChangeDetectorRef, public projectService: ProjectService, public loaderService: LoaderService) 
  {

  }

  ngOnInit(): void 
  {
    let selectedProject = this.projectService.getSelected();
    if(selectedProject?.objectId)
    {
    let json = {project: selectedProject.objectId};
        console.log('Search criteria:', json);
      this.download(json);
    }
  }

  onKeyup(event: KeyboardEvent): void
  {
      console.log('Key pressed:', event.key);
      this.checkFilter();
  }

  convertTimeToLocal(time: any): string 
  {
      const date = new Date(time);
      return date.toLocaleString();
  }

  onChangeStatus(event: any): void 
  {
    console.log('Status changed:', event.target.value); 
    this.checkFilter();
  }

  checkFilter(): void
  {
    let currentProject = this.projectService.getSelected() ;
    
    if (currentProject) {
        let jsonSearch: any = {project: currentProject.objectId};

      let i_search = document.getElementById('i_search');
      

      if (i_search) {
        let searchValue = (i_search as HTMLInputElement).value.toUpperCase();

        jsonSearch = {project: currentProject.objectId, search: searchValue}
      }

      let s_status = document.getElementById('s_status');
      if(s_status)
      {
        let searchValue = (i_search as HTMLInputElement).value.toUpperCase();
        let statusValue = (s_status as HTMLSelectElement).value;

        jsonSearch = {project: currentProject.objectId, search: searchValue, status: statusValue}
      }

      this.download(jsonSearch);
    }
  }

  download(json: any) {
      this.loaderService.show();
    this.propertyService.getProperties(json).subscribe({
      next: (data) => {
        this.loaderService.hide();
        console.log('Properties fetched successfully:', data);
        //this.properties = data.result;

        this.propertyService.setData(data.result);
        // Then here:
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.loaderService.hide();
        console.error('Error fetching properties:', error);
      }
    });
  }

  goCreate(): void {
    //this.router.navigate(['properties/create']);
    displayHTML('property-create-component', 'block');
  }

  goMap(): void {
    this.router.navigate(['properties/map']);
  }

  propertyCreated(property: Property): void {
    console.log('Property created event received in PropertiesListPage', property);
    displayHTML('property-create-component', 'none');

    Swal.fire({
    icon: 'success',
    title: 'Éxito',
    text: 'Propiedad creada exitosamente'
    });
          
    this.checkFilter();
    this.cdr.detectChanges();
  }

  confirmDeleteProperty(property: Property): void {
    Swal.fire({
      title: '¿Eliminar propiedad?',
      html: `
        <div style="text-align: left; margin: 20px 0;">
          <p><strong>Código:</strong> ${property.code}</p>
          <p><strong>ID:</strong> ${property.objectId}</p>
          <p><strong>Área:</strong> ${property.area} m²</p>
          <p><strong>Dimensiones:</strong> ${property.width}m x ${property.depth}m</p>
          <p><strong>Estado:</strong> ${property.status}</p>
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
        this.deleteProperty(property);
      }
    });
  }

  deleteProperty(property: Property): void {
    // Aquí iría la lógica real para eliminar la propiedad
    // Por ejemplo: this.propertyService.deleteProperty(property.objectId)
    
    // Simulación de eliminación exitosa
    console.log('Eliminando propiedad:', property);
    
    // Mostrar confirmación de eliminación
    Swal.fire({
      icon: 'success',
      title: 'Propiedad eliminada',
      text: 'La propiedad ha sido eliminada exitosamente.',
      confirmButtonText: 'OK',
      timer: 2000,
      timerProgressBar: true
    }).then(() => {
      // Recargar la lista después de eliminar
      this.checkFilter();
    });
  }
}
