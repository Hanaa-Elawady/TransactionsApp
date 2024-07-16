import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChartModule } from 'primeng/chart';
import { DataService } from 'src/app/shared/services/data.service';
import { ChartPipe } from 'src/app/shared/pipes/chart.pipe';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Transaction } from 'src/app/shared/interfaces/transaction';
import { Customer } from 'src/app/shared/interfaces/customer';

@Component({
  selector: 'app-customer-graph',
  standalone: true,
  imports: [CommonModule,ChartModule,HttpClientModule,FormsModule,RouterLink],
  templateUrl: './customer-graph.component.html',
  styleUrls: ['./customer-graph.component.css'],
  providers: [DataService,ChartPipe],

})
export class CustomerGraphComponent implements OnInit{

  constructor(private _DataService:DataService , private _ChartPipe:ChartPipe, private _ActivatedRoute:ActivatedRoute) {}

  getamount:any;
  amount:number[]=[];
  data: any;
  options: any;
  id!:number;
  transactions:Transaction[]=[];
  lastDate!:any;
  firstDate!:any;
  dates !:string[];
  customers:Customer[]=[]


  ngOnInit(): void {
    this.getID();
  }
  
  getID():void{
    this._ActivatedRoute.params.subscribe(params => {
      this.id = +params['id'];
      })
    this.getdata();
  }

  getdata():void{
    this._DataService.getCustomers().subscribe({
      next:(res)=>{
        console.log(res);
        
        this.customers =res.customers
      }
    })

    this._DataService.getTransactions().subscribe({
      next: (res) => {
        this.transactions = res.transactions;
        this.getamount =res.Transaction;
        this.getFirstAndLastDates(this.transactions)
      }})
  }

  getCustomerName(customerId: number): string {
    const customer = this.customers.find(c => c.id == customerId);
    return customer ? customer.name : 'Unknown';
  }
  // get specific user transaction data for graph
  getAmountArray(){
    this.getamount = this._ChartPipe.transform(this.transactions, this.id);
    let x = 0;
    for (let i = 0; i < this.dates.length; i ++) {          
        if( this.getamount[x] !=undefined && (this.dates[i] == this.getamount[x].date) ){
          this.amount[i] = this.getamount[x].amount 
          x++;
        }else{
          this.amount[i] = 0 ;
        }
    }
    return this.amount
  }
// get dates range based on all transaction
  getFirstAndLastDates(arr: any[]):void{  
    this.lastDate = new Date(arr[0].date);
    this.firstDate = new Date(arr[0].date);
  
    arr.forEach(obj => {
      const currentDate = new Date(obj.date);
      if (currentDate > this.lastDate) {
        this.lastDate = currentDate;
      }
      if (currentDate < this.firstDate) {
        this.firstDate = currentDate;
      }
    });
  
      this.lastDate = this.lastDate.toISOString().split('T')[0];
      this.firstDate= this.firstDate.toISOString().split('T')[0];
      this.dates= this.generateDateArray(this.firstDate, this.lastDate)
      this.ChartData();
  }
// build an array of all days 
  generateDateArray(startDate: string, endDate: string): string[] {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dateArray = [];
    let current = new Date(start);
    while (current <= end) {
      dateArray.push(current.toISOString().split('T')[0]);
      current.setDate(current.getDate() + 1);
    }
    return dateArray;
  }

// biuld the chart 
  ChartData(): void {
    this.data = {
      labels: this.dates,
      datasets: [
        {
          label: 'Transaction Amounts',
          data: this.getAmountArray(),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 0.5 
        }
      ],

    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          grid: {
            color: 'rgba(255, 255, 255, 0.2)'
          },
          ticks: {
            color: 'white'
          }
        },
        y: {
          grid: {
            color: 'rgba(255, 255, 255, 0.2)' 
          },
          ticks: {
            beginAtZero: true,
            color: 'white' 
          }
        }
      },
      plugins: {
        legend: {
          display: true,
          labels: {
            color: '#ba925a',
            font: {
              size: 14
            }
          }
        },
        title: {
          display: false,
          text: 'Transaction Amounts Over Time',
          color: '#ba925a',
          font: {
            size: 16
          }
        }
      }
    };
  }
}
