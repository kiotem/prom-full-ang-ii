import { Component, input } from '@angular/core';
import Agent from '../../models/Agent';

@Component({
  selector: 'app-agent-card-component',
  imports: [],
  templateUrl: './agent-card-component.html',
  styleUrl: './agent-card-component.css'
})
export class AgentCardComponent {
  agent = input<Agent>();
}
