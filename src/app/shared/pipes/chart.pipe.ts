import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'chart',
  standalone: true
})
export class ChartPipe implements PipeTransform {

  transform(value: any[], customerId: number): any[] {
    
    if (!value || !Array.isArray(value)) {  
      return value;
    }

    const filtered = value.filter(item => item.customer_id == customerId);

    const sorted = filtered.sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return sorted;
  }

}
