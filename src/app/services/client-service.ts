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

  create(data: Client)
  {
      console.log('downloadProjects method called');
      return this.http.post<any>(API_URL+'createClient', data, httpOptions);
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

  add(client: Client)
  {
    this.clients.push(client);
  }

  fill(clients: Client[])
  {
    this.clients = clients;
  }

  clear()
  {
    this.clients = [];
  }
}
