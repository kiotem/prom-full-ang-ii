import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import Property from '../../models/Property';
import { LoaderService } from '../../services/loader-service';
import { LoaderComponent } from '../loader-component/loader-component';
import { displayHTML, getTextFromField } from '../../commons/utils';
import { ProjectService } from '../../services/project-service';
import { PropertyService } from '../../services/property-service';
import { PropertyCardComponent } from '../property-card-component/property-card-component';

export default interface PropertySearchInterface {
  selectProperty(property: Property): void;
  cancelSearchProperty(): void;
}

@Component({
  selector: 'app-property-search-component',
  imports: [LoaderComponent, PropertyCardComponent],
  templateUrl: './property-search-component.html',
  styleUrl: './property-search-component.css'
})
export class PropertySearchComponent {
  @Output() selectAction = new EventEmitter<Property>();
  @Output() cancelAction = new EventEmitter<void>();

  constructor(private loaderService: LoaderService, private cdr: ChangeDetectorRef, private projectService: ProjectService, public propertyService: PropertyService) {
    console.log('PropertySearchComponent initialized');
  }

  onKeyup(event: any) {
    console.log(event.target.value);
    
    if (event.key === 'Enter') 
    {
      const searchValue = (event.target as HTMLInputElement).value;
      if(searchValue.length > 0)
      {
        this.search();
      }
    }
  }

  onChangeStatus(event: any) {
    this.search();
  }

  doCreate()
  {

  }

  doCancel()
  {}

  search() 
  {
    let searchValue = getTextFromField('i_search_property');

    let json = 
    {
      project: this.projectService.getSelected()?.objectId,
      search: searchValue.toUpperCase()
    };

    console.log('getProperty called with Pre:', json);
    
    this.loaderService.show();
  
    this.propertyService.getProperties(json).subscribe({
      next: (data) => {
        this.loaderService.hide();
        console.log('Properties fetched successfully:', data);

        this.propertyService.setData(data.result);

        let size = this.propertyService.properties.length;

        let meterValue = this.projectService.getSelected()?.meterValue || 0;

        for(let i = 0; i < size; i++) 
        {
          this.propertyService.properties[i].amount = this.propertyService.properties[i].area * meterValue; // Example calculation
        }

        this.cdr.detectChanges();
      },
      error: (error) => 
      {
        this.loaderService.hide();
        console.error('Error fetching properties:', error);
      }
    });
  } 

  triggerSelectAction(property: Property) {
    console.log('Property selected:', property);
    displayHTML('property-search-component','none');
    this.selectAction.emit(property);
  }

  triggerCancelAction() {
    console.log('Cancel action triggered');
    displayHTML('property-search-component','none');
    //this.cancelAction.emit();
  }
}
