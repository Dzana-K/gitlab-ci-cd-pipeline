import { Routes } from '@angular/router';
import { AuthGuard } from '../core/api/api/auth.guard';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { FavoritesComponent } from '../pages/favorites/favorites.component';
import { LoginComponent } from '../pages/login/login.component';
import { PetDetailComponent } from '../pages/pet-detail/pet-detail.component';
import { RegisterComponent } from '../pages/register/register.component';
import { UploadComponent } from '../pages/upload/upload.component';
import { UserInfoComponent } from '../pages/user-info/user-info.component';

export const LayoutRoutes: Routes = [
    
    {
        path:'upload',
        component:UploadComponent, canActivate:[AuthGuard]
    },
    {
        path:'dashboard',
        component:DashboardComponent, canActivate:[AuthGuard]
    },
    {
        path:'pet/detail/:id',
        component:PetDetailComponent, canActivate:[AuthGuard]
    },
    {
        path:'favorites',
        component:FavoritesComponent, canActivate:[AuthGuard]
    },
    {
        path:'user-info',
        component:UserInfoComponent, canActivate:[AuthGuard]
    },
   {path:'',
    pathMatch:'full',
    redirectTo:'dashboard'
},

];