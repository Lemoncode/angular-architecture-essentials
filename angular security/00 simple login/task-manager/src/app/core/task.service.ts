import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { UserProfile } from '../model/user-profile';
import { environment } from 'src/environments/environment';
import { UserPermission } from '../model/user-permission';
import { Milestone } from '../model/milestone';
import { MilestoneStatus } from '../model/milestone-status';

@Injectable()
export class TaskService {
  constructor(
    private httpClient: HttpClient
  ) { }

  getTasks(): Observable<Task[]> {
    // var accessToken = this._authService.getAccessToken();
    // var headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    // return this.httpClient.get<Task[]>(environment.apiRoot + 'Tasks', { headers: headers });
    return this.httpClient.get<Task[]>(environment.apiRoot + 'tasks');
  }

  getTask(taskId: number): Observable<Task> {
    return this.httpClient.get<Task>(environment.apiRoot + 'tasks/' + taskId);
  }

  getTaskUsers(taskId: number): Observable<UserProfile[]> {
    return this.httpClient.get<UserProfile[]>(environment.apiRoot + 'tasks/' + taskId + '/users');
  }

  addTask(Task: Task): Observable<Task> {
    return this.httpClient.post<Task>(environment.apiRoot + 'tasks', Task);
  }

  deleteTask(Task: Task): Observable<object> {
    return this.httpClient.delete(environment.apiRoot + 'tasks/' + Task.id);
  }

  addUserPermission(userPermission: UserPermission) {
    return this.httpClient.post(environment.apiRoot + 'userPermission', userPermission);
  }

  removeUserPermission(userId: string, taskId: number) {
    return this.httpClient.delete(`${environment.apiRoot}userPermission/?userId=${userId}&taskId=${taskId}`);
  }

  updateUserPermission(userPermission) {
    return this.httpClient.put(`${environment.apiRoot}userPermission`, userPermission);
  }

  getMilestones(taskId: number): Observable<Milestone[]> {
    return this.httpClient.get<Milestone[]>(environment.apiRoot + 'milestone');
  }

  getMilestoneStatuses() {
    return this.httpClient.get<MilestoneStatus[]>(`${environment.apiRoot}tasks/milestoneStatuses`);
  }

  addMilestone(milestone: Milestone) {
    return this.httpClient.post(`${environment.apiRoot}tasks/milestones`, milestone);
  }

  deleteMilestone(id: number) {
    return this.httpClient.delete(`${environment.apiRoot}tasks/milestones/${id}`);
  }

  updateMilestone(milestone: Milestone) {
    return this.httpClient.put(`${environment.apiRoot}tasks/milestones/${milestone.id}`, milestone);
  }
}
