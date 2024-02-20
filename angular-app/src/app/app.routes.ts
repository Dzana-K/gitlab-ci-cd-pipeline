import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

import { RegisterComponent } from './pages/register/register.component';

import { AuthGuard } from './core/api/api/auth.guard';

import { LayoutComponent } from './layout/layout.component';
export const routes: Routes = [
    {
        path:'login',
        component:LoginComponent
    },
    {
        path:'register',
        component:RegisterComponent
    },
    
    {
        path:'',
        component:LayoutComponent, 
        loadChildren:()=>import('./layout/layout.module').then((m)=>m.LayoutModule),
        canActivate:[AuthGuard]
    },


];
