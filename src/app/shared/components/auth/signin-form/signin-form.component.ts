
import { Component } from '@angular/core';
import { LabelComponent } from '../../form/label/label.component';
import { CheckboxComponent } from '../../form/input/checkbox.component';
import { ButtonComponent } from '../../ui/button/button.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-signin-form',
  imports: [
    LabelComponent,
    CheckboxComponent,
    ButtonComponent,
    InputFieldComponent,
    RouterModule,
    FormsModule
],
  templateUrl: './signin-form.component.html',
  styles: ``
})
export class SigninFormComponent {

  showPassword = false;
  isChecked = false;

  username = '';
  password = '';

  private tokenKey = 'access_token';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  onSignIn() { 
    console.log('Username:', this.username);
    console.log('Password:', this.password);
    console.log('Remember Me:', this.isChecked);

    this.authService.login({ username: this.username, password: this.password })
    .subscribe({
      next: (res) => {
        localStorage.setItem('access_token', res.access_token);
        this.router.navigate(['/']);
      },
      error: () => {
        alert('Login failed. Check username/password.');
      }
    });
  }
}
