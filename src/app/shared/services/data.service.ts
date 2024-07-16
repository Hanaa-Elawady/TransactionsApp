import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class DataService {

  constructor(private _HttpClient: HttpClient) {}
    
  getCustomers(): Observable<any> {
    return this._HttpClient.get(`https://hanaa-elawady.github.io/API-JSON/Customer.json`);
  }

  getTransactions(): Observable<any> {
    return this._HttpClient.get(`https://hanaa-elawady.github.io/API-JSON/Transactions.json`);
  }
}
