import { Component, OnInit } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import Project from '../../../models/Project';
import { ProjectService } from '../../../services/project-service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PropertyService } from '../../../services/property-service';
import { LoaderService } from '../../../services/loader-service';
import { LoaderComponent } from '../../../components/loader-component/loader-component';

@Component({
  selector: 'app-properties-create-page',
  imports: [MenuComponent, ProjectSelectorComponent, ReactiveFormsModule, LoaderComponent],
  templateUrl: './properties-create-page.html',
  styleUrls: ['./properties-create-page.css', '../../../../styles/reports.css', '../../../../styles/forms.css']
})
export class PropertiesCreatePage implements OnInit {
  currentProject: Project | undefined;
  propertyForm: FormGroup;
  name: FormControl;
  propertiesGroup: FormControl;
  number: FormControl;
  code: FormControl;
  //details: FormControl;
  address: FormControl;
  area: FormControl;
  builtUpArea: FormControl;
  status: FormControl;
  floors: FormControl;
  project: FormControl;
  propertyType: FormControl;
  width: FormControl;
  depth: FormControl;


  constructor(public projectService: ProjectService, private propertyService: PropertyService, public loaderService: LoaderService) {
    this.currentProject = this.projectService.getSelected();

    this.name = new FormControl('');
    this.propertiesGroup = new FormControl('');
    this.code = new FormControl('');
    //this.details = new FormControl('');
    this.address = new FormControl('');
    this.area = new FormControl('');
    this.builtUpArea = new FormControl(0);
    this.status = new FormControl('Libre');
    this.number = new FormControl('');
    this.floors = new FormControl(0);
    this.project = new FormControl(this.currentProject?.objectId);
    this.propertyType = new FormControl('Lote');
    this.width = new FormControl(0);
    this.depth = new FormControl(0);


    this.propertyForm = new FormGroup({
      name: this.name,
      propertiesGroup: this.propertiesGroup,
      code: this.code,
      //details: this.details,
      address: this.address,
      area: this.area,
      builtUpArea: this.builtUpArea,
      status: this.status,
      number: this.number,
      floors: this.floors,
      project: this.project,
      propertyType: this.propertyType,
      width: this.width,
      depth: this.depth

    });
  }

  ngOnInit(): void {
    this.currentProject = this.projectService.getSelected();
  }

  onKeyup(event: KeyboardEvent): void {
    console.log('Key pressed:', event.key);

    let i_width = document.getElementById('i_width');
    let i_depth = document.getElementById('i_depth');

    if(i_width && i_depth) {
      let widthValue = (i_width as HTMLInputElement).value;
      let depthValue = (i_depth as HTMLInputElement).value;
      if(widthValue  != '' && depthValue != '' ) {
        let width = parseFloat(widthValue);
        let depth = parseFloat(depthValue);
        let area = width * depth;
        
        let i_area = document.getElementById('i_totalArea');
        if(i_area) {
          (i_area as HTMLInputElement).value = area.toString();
          this.area.setValue(area);
        }
      }else{
        let i_area = document.getElementById('i_totalArea');
        if(i_area) {
          (i_area as HTMLInputElement).value = '';
          this.area.setValue('');
        }
      }
    }

  }

  handleSubmit() {

    if(this.propertyForm.valid) 
      {
        this.loaderService.show();

        
        
        /*


        ///
        
        let jsonData = this.propertyForm.value;
        
        this.propertyService.create(jsonData).subscribe({
          next: (response) => {
            console.log('Create successful', response);

            let result = response.result;

            this.loaderService.hide();

            if(result.success) {
              // Handle successful creation
              alert('Propiedad creada exitosamente');


              let i_number = document.getElementById('i_number');
              if(i_number) {
                (i_number as HTMLInputElement).value = '';
                this.number.setValue('');
              }

              let i_totalArea = document.getElementById('i_totalArea');
              if(i_totalArea) {
                (i_totalArea as HTMLInputElement).value = '';
                this.area.setValue('');
              }

              let i_depth = document.getElementById('i_depth');
              if(i_depth) {
                (i_depth as HTMLInputElement).value = '';
                this.depth.setValue(0);
              }

              let i_width = document.getElementById('i_width');
              if(i_width) {
                (i_width as HTMLInputElement).value = '';
                this.width.setValue(0);
              }
              
            }else{
              alert('Error al crear la propiedad: ' + result.message);
            }
          },
          error: (error) => {
            console.error('Create failed', error);
            console.log('Create failed error', error.error.code);
            alert('Error al crear la propiedad: ' + error.error.code);

          this.loaderService.hide();
          }
        });*/
    }else{
      console.error('Form is invalid');
      alert('Por favor llena los campos requeridos');
    }
  }
}