import { Component, OnInit } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { filter } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports:[RouterModule,CommonModule,ToastModule,ConfirmPopupModule,DialogModule],
  standalone:true,
  providers: [ConfirmationService, MessageService],
  
})
export class HomeComponent implements OnInit {

  displayLogoutDialog: boolean = false;
  username: string = '';
  firstSegment: string = '';
  menu = [
    { option: 'Dashboard', path: '/home/dashboard', icon: 'pi-chart-bar' },
    { option: 'Tasks', path: '/home/tasks', icon: 'pi-list' },
    { option: 'Settings', path: '/home/settings', icon: 'pi-cog' },
  ];

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute , private confirmationService: ConfirmationService // Inject the ConfirmationService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  confirmLogout() {
    this.displayLogoutDialog = true; // Show the dialog
  }

  onDialogAccept() {
    this.logout();
    this.displayLogoutDialog = false; // Close the dialog
  }

  onDialogReject() {
    this.displayLogoutDialog = false; // Close the dialog without logging out
  }

  ngOnInit() {
    const token = this.authService.getToken();

    if (token) {
      const decodedPayload = this.decodeToken(token);

      if (decodedPayload && decodedPayload.sub) {
        this.username = decodedPayload.sub;
      } else {
        console.log('Username not found in decoded token');
      }
    } else {
      console.log('No token found');
    }
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateFirstSegment();
      });
    this.updateFirstSegment();
  }

  updateFirstSegment() {
    const urlSegments = this.router.url.split('/').filter((segment) => segment);
    if (urlSegments.length > 0) {
      this.firstSegment = urlSegments[urlSegments.length - 1];
      console.log('Component:', this.firstSegment);
    }
  }

  private decodeToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  }
}