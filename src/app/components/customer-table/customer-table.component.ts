import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from 'src/app/shared/services/data.service';
import { TableModule } from 'primeng/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterByNamePipe } from 'src/app/shared/pipes/filter-by-name.pipe';
import { FilterByAmountPipe } from 'src/app/shared/pipes/filter-by-amount.pipe';
import { RouterLink } from '@angular/router';
import { Customer } from 'src/app/shared/interfaces/customer';
import { Transaction } from 'src/app/shared/interfaces/transaction';

@Component({
  selector: 'app-customer-table',
  standalone: true,
  imports: [CommonModule, TableModule, HttpClientModule ,FormsModule,RouterLink],
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css'],
  providers: [DataService, FilterByNamePipe ,FilterByAmountPipe],
})
export class CustomerTableComponent implements OnInit {
  constructor(private _DataService: DataService ,private _FilterByNamePipe:FilterByNamePipe ,private _FilterByAmountPipe:FilterByAmountPipe ) {}

  customers: Customer[] = [];
  transactions: Transaction[] = [];
  filterdTransaction:Transaction[]=[];
  customerNameFilter: string = '';
  customerAmountFilter: number |undefined;


  ngOnInit(): void {
    this.getData();
  }

  // call api and get all data 
  getData():void{
    this._DataService.getCustomers().subscribe(data => this.customers = data.customers);
    this._DataService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res.transactions;
        this.transactions = this.transactions.map(transaction => {
          return {
            ...transaction,
            customer_name: this.getCustomerName(transaction.customer_id)
          };
        });
        this.filterdTransaction =this.transactions
      }
    });
  }

// get username using the user id 
  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.id == customerId);
    return customer ? customer.name : 'Unknown';
  }


  filterByName(){
    this.customerAmountFilter =undefined
    this.filterdTransaction = this._FilterByNamePipe.transform(this.transactions, this.customerNameFilter)
  }
  filterByAmount(){
    this.customerNameFilter =''
    this.filterdTransaction = this._FilterByAmountPipe.transform(this.transactions, this.customerAmountFilter)
  }
}
