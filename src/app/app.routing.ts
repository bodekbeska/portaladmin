import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IssueslogComponent } from './issueslog/issueslog.component';
import { PortalitemsComponent } from './portalitems/portalitems.component';
import { GroupchatComponent } from './groupchat/groupchat.component';
import { PreloginComponent } from './prelogin/prelogin.component';
import { LoggedInGuard } from './login.guard';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
    {
        path: '',
       // component: PreloginComponent
       redirectTo : '/login',
        pathMatch: 'full'
    },
    {
        path: 'portalitems',        
        component: PortalitemsComponent
        ,        canActivate:[LoggedInGuard]

    },
    {
        path: 'issue',
        component: IssueslogComponent
        ,        canActivate:[LoggedInGuard]
    },
     {
        path: 'chat',
        component: GroupchatComponent
        ,        canActivate:[LoggedInGuard]
    },    
     {
        path: 'login',
        component: LoginComponent
        ,        canActivate:[]
    }
];


export const appRoutingProviders: any[] = [LoggedInGuard];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);