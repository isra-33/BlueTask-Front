import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardModule, CommonModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalTasks: number = 0;
  tasksByStatus: any = {};
  tasksByType: any = {};

  // Define the chart data and options
  basicDataByStatus: any;
  basicDataByType: any;
  basicOptions: any;

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.totalTasks = tasks.length;
        this.tasksByStatus = this.getTaskCountsByStatus(tasks);
        this.tasksByType = this.getTaskCountsByType(tasks);

        // Prepare chart data for tasks by status
        this.basicDataByStatus = {
          labels: Object.keys(this.tasksByStatus), // e.g., ['Pending', 'Completed']
          datasets: [
            {
              label: 'Tasks by Status',
              data: Object.values(this.tasksByStatus), // e.g., [10, 5]
              backgroundColor: '#42A5F5',
            }
          ]
        };

        // Prepare chart data for tasks by type
        this.basicDataByType = {
          labels: Object.keys(this.tasksByType), // e.g., ['Bug', 'Feature']
          datasets: [
            {
              label: 'Tasks by Type',
              data: Object.values(this.tasksByType), // e.g., [15, 7]
              backgroundColor: '#66BB6A',
            }
          ]
        };

        // Define options for the chart
        this.basicOptions = {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            tooltip: {
              callbacks: {
                label: (tooltipItem: any) => {
                  return tooltipItem.raw + ' tasks';
                }
              }
            }
          }
        };
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
      }
    });
  }

  getTaskCountsByStatus(tasks: any[]) {
    return tasks.reduce((counts: any, task: any) => {
      counts[task.status] = (counts[task.status] || 0) + 1;
      return counts;
    }, {});
  }

  getTaskCountsByType(tasks: any[]) {
    return tasks.reduce((counts: any, task: any) => {
      counts[task.type] = (counts[task.type] || 0) + 1;
      return counts;
    }, {});
  }
}
