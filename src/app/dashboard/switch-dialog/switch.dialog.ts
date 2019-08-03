import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  duration: number;
}

@Component({
    selector: 'switch-dialog',
    templateUrl: 'switch.dialog.html',
  })
  export class SwitchDialog {
  
    constructor(
      public dialogRef: MatDialogRef<SwitchDialog>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }