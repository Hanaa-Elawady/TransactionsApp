import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByAmount',
  standalone: true
})
export class FilterByAmountPipe implements PipeTransform {

  transform(data: any[], searchValue: number |undefined): any[] {
    if (!data || !Array.isArray(data)) {
      return data;
    }
    
    if (!searchValue) {
      return data;
    }

    const filtered = data.filter(item => {
      return item.amount.toString().includes(searchValue.toString());
    })

    return filtered;
  }

}
