import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { AuthService } from '../../core/api/api/auth.service';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../../shared/alert/alert.component';
import { PlaceholderDirective } from '../../shared/placeholder/placeholder.directive';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl:'./login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  error:string | undefined;
  formData = {
    email: '',
    password: ''
  };
  @ViewChild(PlaceholderDirective, { static: false }) alertHost!: PlaceholderDirective; 
  private closeSub: Subscription = new Subscription;
  constructor(private authService: AuthService, private componentFactoryResolver: ComponentFactoryResolver, private router: Router) {}

  onSubmit() {
    console.log(this.formData)
    this.authService.login(this.formData).subscribe(
      response => {
        this.authService.saveAccessToken(
          response.access_token,

        );
        this.authService.saveRefreshToken(
          response.refresh_token,

        );
        this.authService.saveUserId(response.user_id);
        this.router.navigate(['/dashboard']);
        console.log('Login successful', response);
        // Handle success, e.g., redirect to another page
      },
      error => {
        this.error=error
        this.showErrorAlert(error)
        console.log(error)
      }
    );
  }
  private showErrorAlert(message: string) {
    if (!this.alertHost || !this.alertHost.viewContainerRef) {
      console.error('Alert host or view container ref is not initialized.');
      return;
    }
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
    const hostViewContainerRef = this.alertHost.viewContainerRef
    hostViewContainerRef.clear()
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
    this.closeSub.unsubscribe()
    hostViewContainerRef.clear()})
  }
}