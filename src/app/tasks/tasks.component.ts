import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    TableModule, 
    ConfirmPopupModule,
    DialogModule,
    ToastModule,
    DropdownModule,
    ButtonModule,
    CommonModule,
    FormsModule
  ]
})
export class TasksComponent implements OnInit {
  isEditMode: boolean = false;
  tasks: any[] = [];
  newTask = { title: '', type: '', status: '' };
  displayAddDialog: boolean = false;
  typeOptions: any[] = [];
  statusOptions: any[] = [];
  currentTaskId: number | null = null;

  constructor(
    private taskService: TaskService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.loadTasks();
    this.initializeOptions();
  }

  initializeOptions() {
    this.typeOptions = this.getTypeEnum().map(type => ({
      label: type,
      value: type
    }));

    this.statusOptions = this.getStatusEnum().map(status => ({
      label: status,
      value: status
    }));
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('Error loading tasks:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load tasks.' });
      }
    });
  }

  showAddDialog() {
    this.isEditMode = false;
    this.displayAddDialog = true;
  }

  showEditDialog(task: any) {
    this.isEditMode = true;
    this.newTask = { ...task }; // Pre-fill the form with existing task data
    this.currentTaskId = task.id; // Store the current task ID for editing
    this.displayAddDialog = true;
  }

  hideAddDialog() {
    this.displayAddDialog = false;
    this.resetNewTask();
  }

  resetNewTask() {
    this.newTask = { title: '', type: '', status: '' };
    this.currentTaskId = null;
  }

  addTask() {
    if (!this.newTask.title || !this.newTask.type || !this.newTask.status) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'All fields are required.' });
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.hideAddDialog();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task added successfully!' });
      },
      error: (error) => {
        console.error('Error creating task:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to add task.' });
      }
    });
  }

  updateTask() {
    if (!this.newTask.title || !this.newTask.type || !this.newTask.status) {
      this.messageService.add({ severity: 'warn', summary: 'Validation', detail: 'All fields are required.' });
      return;
    }

    if (this.currentTaskId === null) return;

    this.taskService.updateTask(this.currentTaskId, this.newTask).subscribe({
      next: () => {
        this.loadTasks();
        this.hideAddDialog();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task updated successfully!' });
      },
      error: (error) => {
        console.error('Error updating task:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to update task.' });
      }
    });
  }

  confirmDelete(event: Event, taskId: number) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this task?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteTask(taskId);
      },
      reject: () => {
        this.messageService.add({ severity: 'info', summary: 'Cancelled', detail: 'Task deletion cancelled.' });
      }
    });
  }

  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadTasks();
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Task deleted successfully!' });
      },
      error: (error) => {
        console.error('Error deleting task:', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete task.' });
      }
    });
  }

  getStatusEnum(): string[] {
    return this.taskService.getStatusEnum();
  }

  getTypeEnum(): string[] {
    return this.taskService.getTypeEnum();
  }
}
