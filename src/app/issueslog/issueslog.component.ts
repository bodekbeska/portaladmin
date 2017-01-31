import { Component, OnInit, EventEmitter, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { LoginService } from '../login.service';
import { IIssue } from '../issuelog';
import { AbstractControl, FormArray,FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MaterializeAction} from 'angular2-materialize';
import * as firebase from 'firebase';
declare var jQuery: any;

 declare var Materialize:any;
@Component({
  selector: 'app-issueslog',
  templateUrl: './issueslog.component.html',
  styleUrls: ['./issueslog.component.css']
})
export class IssueslogComponent implements OnInit {
 issues: FirebaseListObservable<any>;
 issue: IIssue;
 form : FormGroup;
 updatesubmitflag: boolean;
 currentKey: string;
 image: string;
 files: any;
 uploading:boolean;
 progress: string;
 attachments: any[];

  constructor(public af: AngularFire, public loginservice: LoginService, public fb: FormBuilder, private _elRef:ElementRef) {}

  ngOnInit() {



    this.clearForm();this.updatesubmitflag=true;
      if(this.loginservice.isAuthenticated){
          this.uploading = false;
          this.issues = this.af.database.list('/issues',{
                    query: {
                      limitToLast: 100
                    }
                }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
      }

      this.issues.subscribe(val=>{       
         jQuery(this._elRef.nativeElement).find('.materialboxed').materialbox();
      });
  }

onChange(event) {  
   this.files=[];  
  this.files = event.srcElement.files;
 }

clearForm(){
    this.files=null;
    this.attachments=[];
    this.form = this.fb.group({
          SubmittedBy : this.loginservice.displayName,
          SubmittedByEmail:this.loginservice.email,
          SubmittedByPhotoUrl : this.loginservice.photoUrl,
          timestamp : '',
          issue: '',
          description: '',
          dateOfIssue: '',
          solution: '',
          dateResolved: '',   
          attachments: [],
          fileList:''
    });
}

submitIssue(){
   

   //to show uploading gif 
    const storageRef = firebase.storage().ref();
     var folderName = Date.now().toString();
    if(this.files){     
       this.uploading = true;             
                  var count = this.files.length;
                  for (var i = 0; i < this.files.length; i++){ //upload each file
                   
                    var imageRef = storageRef.child(folderName+'/'+this.files[i].name);               
                    imageRef.put(this.files[i]).then((snapshot)=>
                    {                         
                          this.attachments.push({
                            folderName: folderName,
                            fileName: snapshot.metadata.name,
                            url: snapshot.metadata.downloadURLs[0]
                          });

                          if(this.attachments.length===count)   {
                             this.uploading = false; 
                             this.form.value.attachments = this.attachments;  
                             this.form.value.timestamp = Date.now().toString();   
                              this.issues.push(this.form.value);
                              this.clearForm();
                          }//return true;
                          
                     });
                  }
      } //end if files exist
      else{
                  this.form.value.timestamp = Date.now().toString();   
                  this.form.value.attachments=this.attachments;
                  this.issues.push(this.form.value);
                  this.clearForm();
      }
   
   
}


deleteIssue(key){
  this.issues.remove(key);
}

deleteAttachment(key, issue, a, index){
const storageRef = firebase.storage().ref();
var deleteRef = storageRef.child(a.folderName +'/'+a.fileName);

// Delete the file
deleteRef.delete().then(function() {
  // File deleted successfully
}).catch(function(error) {
  // Uh-oh, an error occurred!
});

issue.attachments.splice(index,1);
    this.issues.update( issue.$key,
           {
                SubmittedBy : issue.SubmittedBy,
                SubmittedByEmail:issue.SubmittedByEmail,
                SubmittedByPhotoUrl : issue.SubmittedByPhotoUrl,
                timestamp : issue.timestamp,
                issue:issue.issue,
                description:issue.description,
                solution: issue.solution,
                dateOfIssue: issue.dateOfIssue,
                dateResolved: issue.dateResolved,   
               attachments:issue.attachments,    
               fileList:issue.fileList              
            } 
    );

jQuery(this._elRef.nativeElement).find('.materialboxed').materialbox();

}

updateIssue(issue: IIssue, key:any) {  
console.log(issue);

if(issue.attachments)
this.attachments = issue.attachments; 
else
this.attachments =[];
console.log(this.attachments);

this.currentKey = key;
this.form = this.fb.group({
      
          SubmittedBy : this.loginservice.displayName,
          SubmittedByEmail:this.loginservice.email,
          SubmittedByPhotoUrl : this.loginservice.photoUrl,
          timestamp : '',
          issue: issue.issue,
          description: issue.description, 
          dateOfIssue: issue.dateOfIssue,
          solution: issue.solution,
          dateResolved: issue.dateResolved,   
          attachments: [],
          fileList:issue.fileList
    });
    

  this.openModal();   
   //   setTimeout(function() {Materialize.updateTextFields(); }, 100);
  }

  updateForm() {



var originalcount=0;
   const storageRef = firebase.storage().ref();
     var folderName = Date.now().toString();
    if(this.files){     
      console.log("has files");
       this.uploading = true;             
                     
                var   originalcount = this.attachments.length;

                  var count = this.files.length;
                  for (var i = 0; i < this.files.length; i++){ //upload each file
                   
                    var imageRef = storageRef.child(folderName+'/'+this.files[i].name);               
                    imageRef.put(this.files[i]).then((snapshot)=>
                    {                         
                          this.attachments.push({
                            folderName: folderName,
                            fileName: snapshot.metadata.name,
                            url: snapshot.metadata.downloadURLs[0]
                          });

                          
                          if((this.attachments.length-originalcount)===count)   {

                             this.uploading = false; 
                             this.form.value.attachments = this.attachments;  
                             this.form.value.timestamp = Date.now().toString();   
                             
                            this.issues.update( this.currentKey,
                                    {
                                          SubmittedBy : this.loginservice.displayName,
                                          SubmittedByEmail:this.loginservice.email,
                                          SubmittedByPhotoUrl : this.loginservice.photoUrl,
                                          timestamp : Date.now().toString(),
                                          issue:this.form.value.issue,
                                          description:this.form.value.description,
                                          solution: this.form.value.solution,
                                          dateOfIssue: this.form.value.dateOfIssue,
                                          dateResolved: this.form.value.dateResolved,   
                                          attachments:this.form.value.attachments,    
                                          fileList:this.form.value.fileList              
                                      } 
                              );
                              this.files=null;
                             
                          }
                          
                     });
                  }
      } //end if files exist
      else{
         console.log("No files");
         
                  this.form.value.timestamp = Date.now().toString();

                  if(this.attachments===null || this.attachments===undefined)
                  {
                    this.form.value.attachments = [];                    
                  } else{
                    this.form.value.attachments= this.attachments;                   
                  }
                  
                  console.log(this.form.value.attachments);

                  this.issues.update( this.currentKey,
                                    {
                                          SubmittedBy : this.loginservice.displayName,
                                          SubmittedByEmail:this.loginservice.email,
                                          SubmittedByPhotoUrl : this.loginservice.photoUrl,
                                          timestamp : Date.now().toString(),
                                          issue:this.form.value.issue,
                                          description:this.form.value.description,
                                          solution: this.form.value.solution,
                                          dateOfIssue: this.form.value.dateOfIssue,
                                          dateResolved: this.form.value.dateResolved,   
                                          attachments:this.form.value.attachments,    
                                          fileList:this.form.value.fileList              
                                      } 
                              );
                 
      }
    
 
 
  }



  modalActions = new EventEmitter<string|MaterializeAction>();
  openModal() {
    this.modalActions.emit({action:"modal",params:['open']});
    this.updatesubmitflag = false;
  }
   openModalNew() {
    this.modalActions.emit({action:"modal",params:['open']});
    this.clearForm();
   this.updatesubmitflag = true;
  }
  closeModal() {
    this.modalActions.emit({action:"modal",params:['close']});
  }

}
