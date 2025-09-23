import { Injectable } from '@angular/core';
import Sale from '../models/Sale';
import { HttpClient } from '@angular/common/http';
import { API_URL, httpOptions } from '../commons/enviroments';

@Injectable({
  providedIn: 'root'
})
export class SaleService {
  sales: Sale[];

  constructor(private http: HttpClient)
  {
    this.sales = [];
  }

  create(data: Sale)
  {
      console.log('Sale method called');
      return this.http.post<any>(API_URL+'createSale', data, httpOptions);
  }

  fill(data: Sale[])
  {
    console.log('Fill method called');
    this.sales = data;
  }

  list(params: any)
  {
    console.log('List method called');
    return this.http.post<any>(API_URL+'salesList', params, httpOptions);
  }
}
