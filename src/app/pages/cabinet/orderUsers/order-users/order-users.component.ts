import { Component } from '@angular/core';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { AccountService } from 'src/shared/services/accounts/account.service';

@Component({
  selector: 'app-order-users',
  templateUrl: './order-users.component.html',
  styleUrls: ['./order-users.component.scss']
})
export class OrderUsersComponent {
  public ordersHistory: Array<IProductResponse> = [];
  public user!: string;
  
  
  
  constructor(
    private accountService: AccountService,

  ) {}

  ngOnInit() {
    this.loadOrder()
  }

  //  чомусь замовлення перезаписуються (видає останнє)
  loadOrder() {
    const userExists = localStorage.getItem('currentUser');
   if (userExists) {
    const user = JSON.parse(userExists);
    const userId = user.uid;
    console.log(userId);
    this.accountService.getOneUserFirebase(userId).subscribe((data) => {
      const arr = data['orders'];
      data['orders'] = JSON.parse(arr);
       this.ordersHistory = data['orders'];
       console.log(this.ordersHistory)
      })
    }
  }

}
