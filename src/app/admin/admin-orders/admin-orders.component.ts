import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IOrderResponse } from 'src/shared/interfaces/order/order.interface';
import { OrderService } from 'src/shared/services/orders/order.service';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent {

  public adminOrders: Array<IOrderResponse> = [];
  public statusChange = false;
  public status = '';

  constructor(
    private orderService: OrderService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadOrder();
  }

  loadOrder() {
    this.orderService.getAllFirebaseOrder().subscribe((data) => {
      console.log(data)
      data.forEach((product) => {
        if (product['orderProduct']) {
          product['orderProduct'] = JSON.parse(product['orderProduct']);
        }
      })
    
      this.adminOrders = data as IOrderResponse[];

    })
  }

  changeStatus(order: IOrderResponse){
    this.statusChange = !this.statusChange;
    order.status = "Виконано";
    order.orderProduct = JSON.stringify(order.orderProduct) as any,


     this.orderService.updateFirebaseOrders(order, order.id)
     .then(() => {
      this.toastr.success('Orders successfully updateOrder');
     })
     .catch((error) => {
      console.error('Failed to update orders:', error);
    });
    
  }


  deleteOrder(order: IOrderResponse):void{
    this.orderService.deleteFirebaseOrders(order.id).then(()=>{
      this.loadOrder();
      this.toastr.success('Order successfully deleted');
    })
  }

}
