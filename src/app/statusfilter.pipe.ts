import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusfilter'
})
export class StatusfilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
          if(args===undefined) return value;

    return value.filter(v=>{
      return (v.Status.includes(args))  ;
    });
  }

}
