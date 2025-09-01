import { Component } from '@angular/core';
import { MenuComponent } from '../../../components/menu-component/menu-component';
import { LoaderComponent } from '../../../components/loader-component/loader-component';
import { ProjectSelectorComponent } from '../../../components/project-selector-component/project-selector-component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';

@Component({
  selector: 'app-properties-map-page',
  imports: [MenuComponent, ProjectSelectorComponent, LoaderComponent, GoogleMap, GoogleMapsModule],
  templateUrl: './properties-map-page.html',
  styleUrl: './properties-map-page.css'
})
export class PropertiesMapPage {

  center: google.maps.LatLngLiteral = { lat: 9.401664139921357, lng: -75.43222199866544 };
  mapZoom = 18;

  mapOptions: google.maps.MapOptions = 
  {
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: true,
    fullscreenControl: false,
    mapTypeControl: true,
    mapTypeId: 'hybrid',
    mapId: '7f656e587f4e86ae627f4c40'
  };


}
