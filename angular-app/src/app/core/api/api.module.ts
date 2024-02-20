import { ModuleWithProviders, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {  HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthService } from './api/auth.service';

@NgModule({
    imports: [HttpClientModule],
    declarations: [],
    exports: [],
    providers: [HttpClientModule]
})
export class ApiModule {
    static forRoot(): ModuleWithProviders<ApiModule> {
        return {
          ngModule: ApiModule,
          providers: [
            // Add any additional services or configurations here
          ],
        };
      }
    constructor(http: HttpClient) {
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
