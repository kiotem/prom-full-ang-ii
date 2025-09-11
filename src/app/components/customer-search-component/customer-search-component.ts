import { Component } from '@angular/core';

@Component({
  selector: 'app-customer-search-component',
  imports: [],
  templateUrl: './customer-search-component.html',
  styleUrl: './customer-search-component.css'
})
export class CustomerSearchComponent {
  onKeyup(event: any) {
    console.log(event.target.value);
  }

  onChangeStatus(event: any) {
    console.log(event.target.value);
  }
}
