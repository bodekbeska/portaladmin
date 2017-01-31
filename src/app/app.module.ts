import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { AppComponent } from './app.component';


//import { MaterializeDirective } from "angular2-materialize";
import { MaterializeModule } from 'angular2-materialize';
import { IssueslogComponent } from './issueslog/issueslog.component';
import { PortalitemsComponent } from './portalitems/portalitems.component';

import { routing } from './app.routing';
import { GroupchatComponent } from './groupchat/groupchat.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { LoginService } from './login.service'; 
import { LoggedInGuard } from './login.guard';
import { FilterPipe } from './filter.pipe';
import { PreloginComponent } from './prelogin/prelogin.component';

import { StatusfilterPipe } from './statusfilter.pipe'; 



export const firebaseConfig = {
apiKey: "AIzaSyBoD7ECGXzHnIMGkxrvW_NLsRS86nILtek",
    authDomain: "portal-items.firebaseapp.com",
    databaseURL: "https://portal-items.firebaseio.com",
    storageBucket: "portal-items.appspot.com",
    messagingSenderId: "686960755724"
};
const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup
};

@NgModule({
  declarations: [
    AppComponent, IssueslogComponent, PortalitemsComponent, GroupchatComponent, LoginComponent, MenuComponent, FilterPipe, PreloginComponent, StatusfilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
     AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
     routing,
     MaterializeModule,
     ReactiveFormsModule
  ],
  providers: [LoginService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
