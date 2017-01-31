import { LoginService} from './login.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class LoggedInGuard implements CanActivate {
    constructor(private loginService: LoginService, private router:Router){}

    canActivate() : boolean {
        console.log("log in guard invoked");
    
        let authenticated = false;

        if (this.loginService.isAuthenticated){
            authenticated = true;           
        }
        else {
            this.router.navigate(['/login']);
        }
        console.log("returning from guard function with " + authenticated);
        return authenticated;


}

}