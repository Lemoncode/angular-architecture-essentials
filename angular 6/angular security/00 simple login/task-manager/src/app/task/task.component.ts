import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

// import { DeleteDialogComponent } from '../admin/delete-dialog.component';
// import { AccountService } from '../core/account.service';
import { TaskService } from '../core/task.service';
import { formatError } from '../core/utils';
import { Milestone } from '../model/milestone';
import { MilestoneStatus } from '../model/milestone-status';
import { Task } from '../model/task';
import { AddEditMilestoneDialogComponent } from './add-edit-milestone-dialog.component';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {
  displayedColumns = ['name', 'status', 'actions'];
  dataSource = new MatTableDataSource();
  milestones: Milestone[];
  milestoneStatuses: MilestoneStatus[];
  task: Task;
  error: string;

  constructor(
    private route: ActivatedRoute,
    private taskService: TaskService,
    // private _acctService: AccountService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    const taskId = this.route.snapshot.params.taskId;
    this.taskService.getMilestoneStatuses().subscribe(ms => {
      this.milestoneStatuses = ms;
    });
    this.taskService.getTask(taskId).subscribe(task => {
      this.task = task;
      this.milestones = task.milestones;
      this.dataSource.data = this.milestones;
    });
  }

  addMilestone() {
    const newMs: Milestone = {};
    newMs.taskId = this.task.id;
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: '348px',
      data: {
        milestone: newMs,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses[0],
        mode: 'Add'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.taskService.addMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  editMilestone(milestone: Milestone) {
    const clonedMilestone = JSON.parse(JSON.stringify(milestone));
    const dialogRef = this.dialog.open(AddEditMilestoneDialogComponent, {
      width: '348px',
      data: {
        milestone: clonedMilestone,
        milestoneStatuses: this.milestoneStatuses,
        defaultStatus: this.milestoneStatuses.find(ms => ms.id == milestone.milestoneStatusId)
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      // TODO: Change this boolean assert
      if (result !== undefined) {
        this.taskService.updateMilestone(result).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }

  deleteMilestone(milestone: Milestone) {
    // const dialogRef = this.dialog.open(DeleteDialogComponent, {
    //   width: '348px',
    //   data: { entityName: 'Milestone', message: `Are you sure you want to delete milestone ${milestone.name}?` }
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   if (result !== undefined) {
    //     this.taskService.deleteMilestone(milestone.id).subscribe(() => {
    //       this.ngOnInit();
    //     }, error => this.error = formatError(error));
    //   }
    // });
  }

  // TODO: Refactor this code.
  getStatusName(id: number) {
    if (!this.milestoneStatuses) return '';
    var status = this.milestoneStatuses.find(ms => ms.id == id);
    return status ? status.name : 'unknown';
  }
}
