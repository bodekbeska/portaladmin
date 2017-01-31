import { Component, OnInit } from '@angular/core';
import { LoginService} from '../login.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 private errorDuringLogin = false;
  constructor(private loginService: LoginService, private router:Router) { }

  ngOnInit() {

    console.log("Starting login Page. Authenticates is: "+ this.loginService.isAuthenticated);
    
    if(this.loginService.isAuthenticated){
      this.router.navigate(['/portalitems']);
    }else{
      this.loginService.login().then((authState)=>{
        if(authState && authState.uid){
          console.log("successful login for " + authState.auth.displayName);
          this.router.navigate(['/portalitems']);
        } else {
          this.errorDuringLogin = true;
        }
      })
    };


  }

}
