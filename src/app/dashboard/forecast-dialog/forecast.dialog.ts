import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ForecastView } from 'src/app/entities';

@Component({
    selector: 'forecast-dialog',
    templateUrl: 'forecast.dialog.html',
  })
  export class ForecastDialog {
  
    constructor(
      public dialogRef: MatDialogRef<ForecastDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ForecastView) {}
  
    onNoClick(): void {
      this.dialogRef.close();
    }
  
  }