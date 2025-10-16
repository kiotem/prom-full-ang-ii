import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL, httpOptions } from '../commons/enviroments';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) 
  { 

  }
  
  auth(data: any, callback: (data: any, success: boolean) => void)
  {
    this.http.post<any>(API_URL+'loginWithProjects', data, httpOptions).subscribe({
      next: (data) => {
        //console.log('Sale downloaded successfully:', data);
        callback(data, true);
      },
      error: (error) => {
        //console.error('Error downloading sale:', error);
        callback(null, false);
      }
    });
  }
}
