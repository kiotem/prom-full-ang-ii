import { Component } from '@angular/core';
import Project from '../../models/Project';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from '../loader-component/loader-component';
import { ProjectService } from '../../services/project-service';
import { LoaderService } from '../../services/loader-service';
import { PropertyService } from '../../services/property-service';
import { displayHTML, getNumberFromField } from '../../commons/utils';

@Component({
  selector: 'app-property-create-component',
  imports: [ReactiveFormsModule],
  templateUrl: './property-create-component.html',
  styleUrl: './property-create-component.css'
})
export class PropertyCreateComponent {
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

    constructor(private projectService: ProjectService, private propertyService: PropertyService, private loaderService: LoaderService) 
    {
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

  ngOnInit(): void 
  {
    this.currentProject = this.projectService.getSelected();
  }

  onKeyup(event: KeyboardEvent): void 
  {
    console.log('Key pressed:', event.key);

    let widthValue = parseFloat(getNumberFromField('i_width'));
    let depthValue = parseFloat(getNumberFromField('i_depth'));

    let area = widthValue * depthValue;

    this.area.setValue(area);
/*
    let i_width = document.getElementById('i_width');
    let i_depth = document.getElementById('i_depth');

    if(i_width && i_depth) 
    {
      let widthValue = (i_width as HTMLInputElement).value;
      let depthValue = (i_depth as HTMLInputElement).value;
      if(widthValue  != '' && depthValue != '' ) 
      {
        let width = parseFloat(widthValue);
        let depth = parseFloat(depthValue);
        let area = width * depth;
        
        let i_area = document.getElementById('i_totalArea');
        if(i_area) 
        {
          (i_area as HTMLInputElement).value = area.toString();
          this.area.setValue(area);
        }
      }else
      {
        let i_area = document.getElementById('i_totalArea');
        if(i_area) 
        {
          (i_area as HTMLInputElement).value = '';
          this.area.setValue('');
        }
      }
    }*/
  }

  onSubmit(): void 
  {
    if(this.propertyForm.valid) 
    {
      this.loaderService.show();

      this.propertyService.create(this.propertyForm.value, (data: any, success: boolean) => {
        if(success) {
          console.log('Property created successfully:', data);
          alert('Propiedad creada exitosamente');

          this.propertyForm.reset();

          //refrescar listado
        } else {
          console.error('Error creating property');
          alert('Error al crear la propiedad');
        }
        
        this.loaderService.hide();
      });
    }else{
      console.error('Form is invalid');
      alert('Por favor llena los campos requeridos');
    }
  }

  onCancel()
  {
    displayHTML('property-create-component', 'none');
  }
}
