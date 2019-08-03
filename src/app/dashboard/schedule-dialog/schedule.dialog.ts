import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ScheduleView } from 'src/app/entities';

@Component({
    selector: 'schedule-dialog',
    templateUrl: 'schedule.dialog.html',
  })
  export class ScheduleDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ScheduleDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ScheduleView) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }