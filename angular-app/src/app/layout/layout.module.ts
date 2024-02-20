import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { RouterModule } from '@angular/router';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from '../app.component';
import { routes } from '../app.routes';
import { ApiModule } from '../core/api/api.module';
import { AuthService } from '../core/api/api/auth.service';
import { AuthInterceptor } from '../core/interceptors/auth.interceptor';
import { MaterialModule } from '../material.module';
import { AdoptionPageModalModule } from '../pages/adoption-page-modal/adoption-page-modal.module';
import { DashboardModule } from '../pages/dashboard/dashboard.module';
import { FavoritesModule } from '../pages/favorites/favorites.module';
import { LoginModule } from '../pages/login/login.module';
import { PetDetailModule } from '../pages/pet-detail/pet-detail.module';
import { RegisterModule } from '../pages/register/register.module';
import { UploadModule } from '../pages/upload/upload.module';
import { UserInfoModule } from '../pages/user-info/user-info.module';
import { SidebarModule } from './sidebar/sidebar.module';
import { LayoutRoutes } from './layout.routing';
import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { LayoutComponent } from './layout.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [



  ],
  imports: [
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(LayoutRoutes),

 
    SidebarModule, 
    
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

})
export class LayoutModule { }