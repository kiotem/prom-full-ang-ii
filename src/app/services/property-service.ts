import { Injectable } from '@angular/core';
import Property from '../models/Property';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from '../commons/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  properties: Property[];
  propertiesFiltered: Property[];

    constructor(private http: HttpClient)
    {
      this.properties = [];
      this.propertiesFiltered = [];
    }

    create(data: Property)
    {
        console.log('downloadProjects method called');
        return this.http.post<any>(API_URL+'createProperty', data, httpOptions);
    }

    clear() {
      this.properties = [];
      this.propertiesFiltered = [];
    }

    setData(properties: Property[]) {
      this.properties = properties;
      this.propertiesFiltered = properties;
    }

    getProperties(json: any)
    {
      console.log('getProperties method called with search:', json);
      return this.http.post<any>(API_URL+'getProperties', json, httpOptions)
    }

    getPropertiesAvailable(json: any)
    {
      console.log('getPropertiesAvailable method called with search:', json);
      return this.http.post<any>(API_URL+'getPropertiesAvailable', json, httpOptions)
    }

    filterProperties(searchTerm: string) {
      if (!searchTerm) {
        this.propertiesFiltered = this.properties;
      } else {
        this.propertiesFiltered = this.properties.filter(property =>
          property.objectId.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    }

}
