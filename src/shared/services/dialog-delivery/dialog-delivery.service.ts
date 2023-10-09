import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Subject } from 'rxjs';
import { DialogDeliveryComponent } from '../../../app/components/dialog-delivery/dialog-delivery.component';

@Injectable({
  providedIn: 'root'
})
export class DialogDeliveryService {
  
  private selectedOptionSubject = new BehaviorSubject<string>('');
  selectedOption$ = this.selectedOptionSubject.asObservable();

  public dialogRef!: MatDialogRef<any>;

  constructor(
    private dialog: MatDialog

    ) { }


  openDialog(shouldOpenOnLoad: boolean = false, enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialogRef = this.dialog.open(DialogDeliveryComponent, {
        width: '700px',
        enterAnimationDuration,
        exitAnimationDuration,
        disableClose: true
      });
    }

    selectOption(option: string) {
      this.selectedOptionSubject.next(option);
    }

    setOption(option: string) {
      this.selectedOptionSubject.next(option);
    }
  
    getOption() {
      return this.selectedOptionSubject.getValue();
    }

}
