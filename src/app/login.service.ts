import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, FirebaseAuthState } from 'angularfire2';

@Injectable()
export class LoginService{

    public isAuthenticated = false;
    public displayName: string = '';
    public photoUrl: string ='';
    public email: string ='';

    constructor(private af : AngularFire){}


    login(): firebase.Promise<FirebaseAuthState>{
        return this.af.auth.login({

        }).then((authState)=>{
                console.log("successful login");
                this.isAuthenticated=true;
                this.displayName = authState.auth.displayName;
                this.photoUrl = authState.auth.photoURL;
                this.email = authState.auth.email;
                return authState;
        }).catch((err)=>{
            console.log(err);
        });
    }

    logout(){
        this.isAuthenticated=false;
        this.displayName = '';
                this.photoUrl = '';
                this.email = '';
        this.af.auth.logout();
    }

}