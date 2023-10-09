import { Component, OnInit } from '@angular/core';
import { DialogDeliveryService } from 'src/shared/services/dialog-delivery/dialog-delivery.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Noa-ua';

  
  constructor(
    private dialogService: DialogDeliveryService
    ) {}
  
   ngOnInit(): void {
    this.dialogService.openDialog(true, '600ms', '500ms');
   }
}
