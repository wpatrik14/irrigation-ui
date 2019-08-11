import { Injectable } from '@angular/core';  
import { Router } from '@angular/router';  
import { MatDialog, MatDialogRef } from '@angular/material';  
import { LoadingDialog } from './loading.dialog';
  
@Injectable()  
export class LoadingService {  
  
  
    constructor(private dialog: MatDialog) { }  
  
    start(message?): MatDialogRef<LoadingDialog> {  
        
        const dialogRef = this.dialog.open(LoadingDialog,{  
            disableClose: true ,  
            data: message == ''|| message == undefined ? "Loading..." : message  
        });  
        return dialogRef;  
      };  
  
    stop(ref:MatDialogRef<LoadingDialog>){  
        ref.close();  
    }    
}