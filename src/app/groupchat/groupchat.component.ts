import { Component, OnInit, ElementRef } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { IMessage } from '../imessage';
import "rxjs/add/operator/map";
import { LoginService } from '../login.service';
import * as firebase from 'firebase';
declare var jQuery: any;

@Component({
  selector: 'app-groupchat',
  templateUrl: './groupchat.component.html',
  styleUrls: ['./groupchat.component.css']
})
export class GroupchatComponent implements OnInit {

 
 messages: FirebaseListObservable<any>;
 newMessage : IMessage;
 chat: string;
 thisUser: any;
 reply: IMessage;
 files: any;
today: string;

  constructor(public af: AngularFire, public loginservice: LoginService, private _elRef:ElementRef) { }

  ngOnInit() {

    this.today = Date.now().toString();

 if(this.loginservice.isAuthenticated){
    this.messages = this.af.database.list('/messages',{
              query: {
                limitToLast: 24
              }
           }).map((array) => array.reverse()) as FirebaseListObservable<any[]>;
 }


    this.newMessage= {
      user : this.loginservice.displayName,
      userEmail:this.loginservice.email,
      userPhotoUrl : this.loginservice.photoUrl,
      timestamp : Date.now().toString(),
      message:"",
      replies:[],
      photoURL:""
       };

 this.messages.subscribe(val=>{
        console.log(val);
         jQuery(this._elRef.nativeElement).find('.materialboxed').materialbox();
      });

  }

 


    submitMessage(event){
          if(event.keyCode == 13) {
              this.newMessage.message=this.chat;     
              this.newMessage.photoURL="n/a";
              this.messages.push( this.newMessage);
              this.chat="";      
          }
    }



   submitReplies(event, message){
          if(event.keyCode == 13) {
       
         let   thisMessage = {
                 message: message.message,
                  timestamp: message.timestamp,
                  user: message.user,
                  userEmail: message.userEmail,
                  userPhotoUrl: message.userPhotoUrl,
                  replies: message.replies,
                  photoURL: message.photoURL
            };

            if(!thisMessage.replies){
              thisMessage.replies=[];
            }

            let newReply={
                 message: event.target.value,
                  timestamp: Date.now().toString(),
                  user: this.loginservice.displayName,
                  userEmail: this.loginservice.email,
                  userPhotoUrl: this.loginservice.photoUrl,
                  replies: [],
                  photoURL: "n/a"
            };

            thisMessage.replies.push(newReply);
          console.log(newReply);
            console.log(thisMessage);
           //   console.log(event.target.value);    
              console.log(message.$key); 
            
           this.messages.update( message.$key, thisMessage);


          }
    }


    deleteMessage(key){
      this.messages.remove(key); 
    }


onChange(event, message) {  
   this.files=[];  
  this.files = event.srcElement.files;
  console.log(this.files);

      let   thisMessage = {
                 message: message.message,
                  timestamp: message.timestamp,
                  user: message.user,
                  userEmail: message.userEmail,
                  userPhotoUrl: message.userPhotoUrl,
                  replies: message.replies,
                  photoURL: message.photoURL
            };


            if(!thisMessage.replies){
              thisMessage.replies=[];
            }

            let newReply={
                 message: '',
                  timestamp: Date.now().toString(),
                  user: this.loginservice.displayName,
                  userEmail: this.loginservice.email,
                  userPhotoUrl: this.loginservice.photoUrl,
                  replies: [],
                  photoURL: ''
            };


 const storageRef = firebase.storage().ref();
 var folderName = Date.now().toString();

var imageRef = storageRef.child(folderName+'/'+this.files[0].name);               
imageRef.put(this.files[0]).then((snapshot)=> {
    newReply.photoURL = snapshot.metadata.downloadURLs[0];
     thisMessage.replies.push(newReply);
     this.messages.update( message.$key, thisMessage);
 });

            

 }


}
