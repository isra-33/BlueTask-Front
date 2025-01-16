import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component'; 
import { HomeComponent } from './home/home.component';
import { TasksComponent } from './tasks/tasks.component';
import { DashboardComponent } from './dashboard/dashboard.component';


export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { 
    path: 'home', 
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }, // Default child route
      { path: 'tasks', component: TasksComponent },
      { path: 'dashboard', component: DashboardComponent },
    ]
  },

  { path: '**', redirectTo: '/login' }];
