import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [ButtonModule, CommonModule, ReactiveFormsModule]
})
export class LoginComponent {
  authForm!: FormGroup;
  isLogin: boolean = true; // Toggle between login and register

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleForm() {
    this.isLogin = !this.isLogin;
    this.authForm.reset(); 
  }

  onLogin() {
    if (this.authForm.valid) {
      this.authService.login(this.authForm.value).subscribe(
        (response) => {
          this.authService.storeToken(response);  // Store the JWT token
          console.log('Login successful', response);
          
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    }
  }

  onSignIn() {
    if (this.authForm.valid) {
      this.authService.signIn(this.authForm.value).subscribe(
        (response: any) => {
          console.log('Sign-in successful', response);
          this.isLogin = true; // Switch to login view
          this.router.navigate(['/login']);
        },
        (error: any) => {
          console.error('Sign-in failed', error);
        }
      );
    }
  }
  
}
