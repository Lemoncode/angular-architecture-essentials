import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { TaskService } from '../core/task.service';
import { formatError } from '../core/utils';
import { Task } from '../model/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styles: []
})
export class TaskListComponent implements OnInit {
  displayColumns = ['name'];
  error: string;
  dataSource = new MatTableDataSource();
  tasks: Task[];

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getTasks()
      .subscribe(
        (tasks) => {
          this.tasks = tasks;
          this.dataSource.data = tasks;
        }, formatError);
  }

}
