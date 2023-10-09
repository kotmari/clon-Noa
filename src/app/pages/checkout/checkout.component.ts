import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { IOrderResponse } from 'src/shared/interfaces/order/order.interface';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { AccountService } from 'src/shared/services/accounts/account.service';
import { DialogDeliveryService } from 'src/shared/services/dialog-delivery/dialog-delivery.service';
import { OrderService } from 'src/shared/services/orders/order.service';




@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  public checkouts: Array<IProductResponse> = [];
  public ordersClient: Array<IOrderResponse> = [];
  public orderForm!: FormGroup;
  public selectedOption = '';
  private user: any;
  public total = 0;
  public countDivaces = 1;

  public toggleDivace = true;
  date = new FormControl(new Date());
  serializedDate = new FormControl(new Date().toISOString());


  constructor(
    private accountService: AccountService,
    private orderService: OrderService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private deliveryService: DialogDeliveryService
   ){}

  ngOnInit() {
    this.deliveryService.selectedOption$.subscribe((option) => {
      this.selectedOption = option;
      console.log(this.selectedOption);
      this.initClientForm();
    });
    this.loadCheckout();
    this.loadOrders();
    this.updateCheckout();
    this.ordersDataUser();
  }

  loadCheckout(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this.checkouts = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
  }
 
  getTotalPrice(): void {
    this.total = this.checkouts.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }


  updateCheckout(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadCheckout();
    })
  }
  loadOrders():void{
    this.orderService.getAllFirebaseOrder().subscribe((data) => {
      this.ordersClient = data as IOrderResponse[];
    })
  }
  productCount(checkout: IProductResponse, value: boolean): void{
    if(value){
      ++checkout.count;
      localStorage.setItem('basket', JSON.stringify(this.checkouts))
    }else if (!value && checkout.count > 1){
      --checkout.count;
      localStorage.setItem('basket', JSON.stringify(this.checkouts));
    }
    this.updateCheckout();
    this.orderService.changeBasket.next(true);
  }
  deleteCheckoutProduct(checkout: IProductResponse): void{
    if (this.checkouts.some((prod) => prod.id === checkout.id)) {
      const index = this.checkouts.findIndex(
        (prod) => prod.id === checkout.id
      );
      this.checkouts.splice(index, 1);
      localStorage.setItem('basket', JSON.stringify(this.checkouts));
      this.updateCheckout();
      this.orderService.changeBasket.next(true);
    }
  }


  initClientForm(){
    this.orderForm = this.fb.group({
      orderProduct: [JSON.stringify(this.checkouts)],
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: [null, Validators.required],
      userCity:[null, Validators.required],
      addressUser: [null, Validators.required],
      addressRestoran: [null, Validators.required],
      countDevices: [0, Validators.required],
      devices: [null, Validators.required],
      cash: [null, Validators.required],
      onlinePayment: [null, Validators.required],
      delivery: [this.selectedOption],
      data: [String(new Date())],
      status:['в процесі'],
      call: [null, Validators.required],
    });

 }

//  data: [String(new Date())],

 ordersDataUser() {
  const userExists = localStorage.getItem('currentUser');
  const { firstName, lastName, phone, userCity, addressUser, 
          addressPestoran, countDevices, devices, cash, onlinePayment, delivery, call } = this.orderForm.value;

  if (userExists) {
    // Якщо є зареєстрований користувач
    this.user = JSON.parse(userExists);
    this.orderForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      phone: this.user.phoneNumber,
      addressUser: this.user.address,
      id: this.user.uid,
      userCity,
      addressPestoran,
      countDevices,
      devices,
      cash,
      onlinePayment,
      delivery,
      call
    });


  } else {
    const ordersData = {
      firstName,
      lastName,
      phone,
      userCity,
      addressUser,
      addressPestoran,
      countDevices,
      devices,
      cash,
      onlinePayment,
      delivery,
      call
  };
  }
}

ordersData() {
  const orderData = this.orderForm.value;
  console.log(orderData)
  this.orderService.createFirebaseOrders(orderData)
    .then(() => {
      this.toastr.success('Orders successfully created');
      this.updateUserOrder();
      this.clearBasket();
    })
    .catch((error) => {
      console.log(error)
    });
}

updateUserOrder(){
  const userExists = localStorage.getItem('currentUser');
  if (userExists) {
   const orders = JSON.stringify(this.checkouts);
   const user = JSON.parse(userExists);
   const userId = user.uid;
   this.accountService.updateUserFirebase(userId, orders)
   .then(() => {
    this.toastr.success('Orders successfully created');
   })
   .catch((error) => {
    console.error('Failed to update user orders:', error);
  });
  }
}
clearBasket(): void {
  this.checkouts = [];
  localStorage.setItem('basket', JSON.stringify(this.checkouts));
  this.updateCheckout();
  this.orderService.changeBasket.next(true);
  this.orderForm.reset();
  localStorage.removeItem('basket');

}


toggleDivacesBlock(): void {
  const driveDeliveryCheckbox = document.getElementById('driveDelivery') as HTMLInputElement;
  if (driveDeliveryCheckbox.checked){
     this.toggleDivace = !this.toggleDivace;
  }else{
    this.toggleDivace = !this.toggleDivace;
  }
}

// divaceCount(increment: boolean){
//   console.log(this.countDivaces)
//   if (increment) {
//     this.countDivaces++;
//   } else {
//     if (this.countDivaces > 1) {
//       this.countDivaces--; 
//     }
//   }

// }

divaceCount(increment: boolean) {
  const countDevicesControl = this.orderForm.get('countDevices');
  if (countDevicesControl) {
    let count = countDevicesControl.value as number;
    count = increment ? count + 1 : count - 1;
    countDevicesControl.setValue(count);
  }
}





}
