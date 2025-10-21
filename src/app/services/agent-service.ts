import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Agent from '../models/Agent';
import { API_URL, httpOptions } from '../commons/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AgentService 
{
  agents: Agent[];

  constructor(private http: HttpClient) 
  {
    this.agents = [];
  }

  fill(agents: Agent[])
  {
    this.agents = agents;
  }

  getAgentsBy(json: any)
  {
    console.log('getAgents method called with search:', json);
    return this.http.post<any>(API_URL+'getAgentsBy', json, httpOptions);
  }
}
