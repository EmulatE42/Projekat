import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(prijatelji: any, term: any): any {
    if (term === undefined) return prijatelji

    return prijatelji.filter(function(prijatelj){

      return prijatelj.first_name.toLowerCase().includes(term.toLowerCase());

    })
  }

}
