import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter2'
})
export class Filter2Pipe implements PipeTransform {

  transform(prijatelji: any, term: any): any {
    if (term === undefined) return prijatelji

    return prijatelji.filter(function(prijatelj){

      return prijatelj.last_name.toLowerCase().includes(term.toLowerCase());

    })
  }
}


