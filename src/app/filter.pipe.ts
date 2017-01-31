import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {

/*
    let filter="";
  if(args===undefined) {
     filter = args[0].toLocaleLowerCase();
  }
    
       return filter ? value.filter(item=> item.PortletName.toLocaleLowerCase().indexOf(filter) != -1) : value;
 

*/

    if(args===undefined) return value;

    return value.filter(v=>{
      return (v.PortletName.toLowerCase().includes(args.toLowerCase())) || 
      (v.PortletDescription.toLowerCase().includes(args.toLowerCase())) || 
      (v.BusinessOwner.toLowerCase().includes(args.toLowerCase())) ;
    });

  }

}
