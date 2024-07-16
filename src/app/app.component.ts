import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { CustomerTableComponent } from "./components/customer-table/customer-table.component";
import { CustomerGraphComponent } from './components/customer-graph/customer-graph.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, CustomerTableComponent, CustomerGraphComponent],
templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TransactionApp';
}
