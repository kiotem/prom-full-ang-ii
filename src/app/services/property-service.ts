import { Injectable } from '@angular/core';
import Property from '../models/Property';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from '../commons/enviroments';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  properties: Property[];

    constructor(private http: HttpClient)
    {
      this.properties = [];
    }

    create(data: Property)
    {
        console.log('downloadProjects method called');
        return this.http.post<any>(API_URL+'createProperty', data, httpOptions);
    }

    setData(properties: Property[]) {
      this.properties = properties;
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
}
