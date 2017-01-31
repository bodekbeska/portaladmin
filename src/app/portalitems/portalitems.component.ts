import { Component, OnInit, EventEmitter } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { LoginService } from '../login.service';
import { IPortalItem } from '../iportalitem';
import {MaterializeAction} from 'angular2-materialize';
import { FilterPipe } from '../filter.pipe';
import { StatusfilterPipe } from '../statusfilter.pipe';

import { Subject } from 'rxjs/Subject'; 
declare var Materialize:any;
@Component({
  selector: 'app-portalitems',
  templateUrl: './portalitems.component.html',
  styleUrls: ['./portalitems.component.css'],
  providers:[FilterPipe, StatusfilterPipe]

})
export class PortalitemsComponent implements OnInit {
 portletname: Subject<any>;
newItem : IPortalItem;

items: FirebaseListObservable<any>;
itemsForView : IPortalItem[];
updatesubmitflag: boolean; //true is submit false is update
currentKey: string;
listFilter: string;
ctrl: any;
status: any[];
 statusSubject: Subject<any>;

  constructor(public af: AngularFire, public loginservice: LoginService) {
 this.itemsForView=[];
 this.status=[];
  }


resetForm(){ 
       this.newItem = {
                PortletID:'',
                PortletName: '',
                PortletDescription: '',
                TargetPopulation: '',
                BusinessOwner: '',
                GoLiveDate: '',
                CloseDate: '',
                Status: '',
                Portal: '',
                TabName: '',
                PageName: '',
                DataSource: '',
                SubmittedBy: this.loginservice.displayName,
                SubmittedByPhotoUrl: this.loginservice.photoUrl,
                SubmittedByEmail: this.loginservice.email,
                SubmittedDate: ''                
            }
}



searchByStatus(value){
   console.log(value);
  

 
    this.items = this.af.database.list('/items', {
      query: {
        orderByChild: 'Status',
        equalTo: this.statusSubject
      }
    });
    this.items.subscribe(val =>{
      this.itemsForView= val;  
      this.statusSubject.next(value); 
    });
   
}


ngOnInit() {    
   this.statusSubject = new Subject();
    this.updatesubmitflag = true;
    if(this.loginservice.isAuthenticated){
      this.items = this.af.database.list('/items');    
      const subscribe = this.items.subscribe(val => {
       
        this.itemsForView= val;  
        val.forEach(element => {

          if(!this.status.includes(element.Status))    
          this.status.push(element.Status);
        
      });
        
        console.log(this.status);
      
    });
      }
    this.resetForm();
  }

submitForm(){  
  console.log(this.newItem);
  this.newItem.SubmittedDate =  Date.now().toString();
  this.items.push(this.newItem);
  this.resetForm();
}

deleteItem(key){
  this.items.remove(key);
}

updateItem(key: string, item: IPortalItem) {   
      this.newItem = item;   
      this.currentKey = key;
      console.log(this.newItem);
      this.openModal();
      this.updatesubmitflag = false; 
      setTimeout(function() {
        console.log("timeout!");
      Materialize.updateTextFields();
      }, 100);

  }

  updateForm(key: string) {  
    console.log(this.newItem);
    this.items.update(this.currentKey, 
    {
                PortletID:this.newItem.PortletID,
                PortletName: this.newItem.PortletName,
                PortletDescription: this.newItem.PortletDescription,
                TargetPopulation: this.newItem.TargetPopulation,
                BusinessOwner: this.newItem.BusinessOwner,
                GoLiveDate: this.newItem.GoLiveDate,
                CloseDate: this.newItem.CloseDate,
                Status: this.newItem.Status,
                Portal: this.newItem.Portal,
                TabName: this.newItem.TabName,
                PageName: this.newItem.PageName,
                DataSource: this.newItem.DataSource,
                SubmittedBy: this.loginservice.displayName,
                SubmittedByPhotoUrl: this.loginservice.photoUrl,
                SubmittedByEmail: this.loginservice.email,
                SubmittedDate: this.newItem.SubmittedDate               
            }
    );
  }

modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
  }
   openModalAddNewItem() {
       this.updatesubmitflag = true; 
       this.resetForm();
       this.modalActions.emit({action:"modal",params:['open']});
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }





}
