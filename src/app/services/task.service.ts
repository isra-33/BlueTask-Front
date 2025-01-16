import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Status, Type } from '../enum/enum';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'http://localhost:8080/tasks';  // Your backend endpoint

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  createTask(task: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, task);  // Posting task data to the server
  }

  updateTask(taskId: number, task: any) {
    return this.http.put(`${this.apiUrl}/${taskId}`, task);
  }
  
  

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);  // Deleting task
  }

  getTasksByStatus(status: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/status/${status}`);  // Get tasks filtered by status
  }

  getStatusEnum(): string[] {
    return Object.values(Status);  // Return values of the Status enum
  }

  getTypeEnum(): string[] {
    return Object.values(Type);  // Return values of the Type enum
  }
}
