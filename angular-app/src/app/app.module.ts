import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AuthInterceptor } from './core/interceptors/auth.interceptor';

import { AppComponent } from './app.component';
import { ApiModule } from './core/api/api.module';
import { AuthService } from './core/api/api/auth.service';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginModule } from './pages/login/login.module';
import { RegisterModule } from './pages/register/register.module';
import { UploadModule } from './pages/upload/upload.module';
import { DashboardModule } from './pages/dashboard/dashboard.module';
import { PetDetailModule } from './pages/pet-detail/pet-detail.module';
import { FavoritesModule } from './pages/favorites/favorites.module';
import { AdoptionPageModalModule } from './pages/adoption-page-modal/adoption-page-modal.module';
import { UserInfoModule } from './pages/user-info/user-info.module';
import { MaterialModule } from './material.module';
import { SidebarModule } from './layout/sidebar/sidebar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { LayoutRoutes } from './layout/layout.routing';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    RouterModule.forRoot(routes),
    ApiModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    RegisterModule,
    UploadModule,
    DashboardModule,
    PetDetailModule,
    FavoritesModule,
    AdoptionPageModalModule,
    UserInfoModule,
    MaterialModule, 
    SidebarModule, 
    BrowserAnimationsModule
  ],
  providers: [AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }