import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName',
  standalone: true
})
export class FilterByNamePipe implements PipeTransform {

  transform(data: any[], searchValue: string): any[] {
    if (!data || !Array.isArray(data)) {
      return data;
    }
    
    if (!searchValue) {
      return data;
    }

    const lowerCaseSearch = searchValue.toLowerCase();
    const filtered = data.filter(item => {
      if (item && typeof item.customer_name === 'string') {
        return item.customer_name.toLowerCase().includes(lowerCaseSearch);
      }
      return false;
    });

    return filtered;
  }

}
