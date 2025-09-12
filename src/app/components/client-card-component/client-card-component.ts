import { Component, input } from '@angular/core';
import Client from '../../models/Client';

@Component({
  selector: 'app-client-card-component',
  imports: [],
  templateUrl: './client-card-component.html',
  styleUrl: './client-card-component.css'
})
export class ClientCardComponent {
  client = input<Client>();
}
