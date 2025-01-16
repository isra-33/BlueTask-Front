# Task Management System - Frontend

The **Task Management System - Frontend** is a web-based interface built using **Angular 18**. It interacts with a **Spring Boot** backend and provides an intuitive way for users to manage tasks and track their progress.

## Features

### Key Features:
- **Dashboard**: Displays an overview of tasks and their statuses using dynamic charts.
- **Task Management**: Add, edit, and delete tasks with confirmation dialogs.
- **Navigation**: Responsive sidebar for navigating between modules such as Dashboard, Tasks, and Settings.
- **Logout**: Secure logout functionality with a confirmation dialog.
- **Role-based Access**: Restricts users' access to specific components based on their role (Admin or User).

## Technologies Used

### Frontend:
- **Angular 18**
  - Framework for building dynamic and responsive user interfaces.
  - Utilizes Angular Router for seamless navigation.
  - Implements role-based access control via Angular Guards.
- **Tailwind CSS**
  - Utility-first CSS framework for responsive design.
- **PrimeNG**
  - UI component library for dialogs, toasts, and confirmation pop-ups.
- **ngx-echarts**
  - Dynamic charts to display task statistics.
  
### Authentication:
- Session-based authentication using JWT tokens for secure access.

## Prerequisites

To run the frontend project, ensure you have the following installed:
- **Node.js** (16.x or higher)
- **Angular CLI** (18.x)

## Getting Started

### 1. Clone the Repository:
```bash
git clone https://github.com/your-username/task-management-system-frontend.git
cd task-management-system-frontend
### 2. Install Dependencies:  npm install
### 3. Start the Development Server: ng serve
## Project Structure
Project Structure
src/app
components: Contains Angular components like HomeComponent, TaskComponent, DashboardComponent, etc.
services: Service classes responsible for API communication, such as AuthService, TaskService, etc.
guards: Contains guards to manage route access based on user roles (e.g., AuthGuard).
models: Contains TypeScript interfaces for data structures, such as Task, User, etc.
assets: Static files like images, logos, and styles.
src/environments
Environment configuration files (environment.ts and environment.prod.ts) for development and production setups.
## How to Use
 ### Login:

Use the login form to authenticate with the backend using valid credentials.
Roles (e.g., Admin, User) determine the available functionality.
Dashboard:

View the dashboard with statistics such as total tasks, completed tasks, and pending tasks displayed in dynamic charts.
### Task Management:

Add, edit, and delete tasks.
Confirm actions using confirmation dialogs powered by PrimeNG.
Settings:

Update user preferences and manage settings for your account.
### Logout:

Click the logout button in the top-right corner to log out securely. A confirmation dialog will prompt before logout.
## Testing
The application is tested in the following environments:
### Browsers: Chrome, Brave and Edge.
## Future Enhancements
Implement persistent storage with a backend database (currently using H2 in-memory database for backend).
Add real-time updates (e.g., using WebSockets).
Implement unit tests and end-to-end testing for frontend components.

