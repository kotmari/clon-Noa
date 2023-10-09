import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogDeliveryService } from 'src/shared/services/dialog-delivery/dialog-delivery.service';

@Component({
  selector: 'app-dialog-delivery',
  templateUrl: './dialog-delivery.component.html',
  styleUrls: ['./dialog-delivery.component.scss']
})
export class DialogDeliveryComponent {

  constructor(
    private dialogRef: MatDialogRef<DialogDeliveryComponent>,
    private dialogDeliveryService: DialogDeliveryService
  ){}


  selectOption(option: string) {
    this.dialogDeliveryService.setOption(option);
    this.dialogRef.close();
  }
  

}
