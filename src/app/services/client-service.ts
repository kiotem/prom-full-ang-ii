import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import Client from '../models/Client';
import { API_URL, httpOptions } from '../commons/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ClientService implements OnInit {
  clients: Client[];

  constructor(private http: HttpClient)
  {
    this.clients = [];
  }

  ngOnInit(): void 
  {
    
  }

  /*
    create(data: Client)
    {
        console.log('downloadProjects method called');
        return this.http.post<any>(API_URL+'createClient', data, httpOptions);
    }
  */
    create(data: Client, callback : (data: any, success: boolean) => void)
    {
      this.http.post<any>(API_URL+'createClient', data, httpOptions).subscribe({
        next: (data) => {
          //console.log('Sale created successfully:', data);
          callback(data, true);
        },
        error: (error) => {
          //console.error('Error creating sale:', error);
          callback(error, false);
        }
      });
    }

  getClients(json: any)
  {
    console.log('getClients method called with search:', json);
    return this.http.post<any>(API_URL+'getClients', json, httpOptions)
  }

  getByPms(json: any)
  {
    console.log('getClientByPms method called with search:', json);
    return this.http.post<any>(API_URL+'getClientByPms', json, httpOptions)
  }

  getBy(json: any)
  {
    console.log('getClientBy method called with search:', json);
    return this.http.post<any>(API_URL+'getClientBy', json, httpOptions)
  }

  add(client: Client)
  {
    this.clients.push(client);
  }

  fill(clients: Client[])
  {
    this.clients = clients;
    console.log('Clients filled:', this.clients);
    this.clients
  }

  clear()
  {
    this.clients = [];
  }
}
