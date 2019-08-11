import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'loading-dialog',
  templateUrl: 'loading.dialog.html',
  styleUrls: ['loading.dialog.scss']
})
export class LoadingDialog {

  constructor(public dialogRef: MatDialogRef<LoadingDialog>
    , @Inject(MAT_DIALOG_DATA) public data: any) { }
} 