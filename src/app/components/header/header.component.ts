import { Component, OnInit} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ROLE } from 'src/shared/constants/constant';
import { ICategoryResponse } from 'src/shared/interfaces/category/category.interface';
import { IProductResponse } from 'src/shared/interfaces/product/product.interface';
import { AccountService } from 'src/shared/services/accounts/account.service';
import { CategoryService } from 'src/shared/services/category/category.service';
import { DialogDeliveryService } from 'src/shared/services/dialog-delivery/dialog-delivery.service';
import { OrderService } from 'src/shared/services/orders/order.service';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent implements OnInit {
 
  public navCategory: Array<ICategoryResponse>=[];
  public baskets: Array<IProductResponse> = [];
  public selectedOption = '';
  public isModalOpen = true;
  public isAllMenuOpen!: boolean;
  public isLogin = false;
  public loginUrl = '';
  public loginPage = '';
  public total = 0;
  public count = 0;
  isMenuOpen = false;


  
  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogDeliveryService,
    private orderService: OrderService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private router: Router,
    
    ) {}
  
   ngOnInit(): void {
   this.userDelivery();
   this.loadNavCategory();
   this.loadBasket();
   this.updateBasket();
   this.checkUserLogin();
   this.checkUpdatesUserLogin();
   }
   

  
   loadNavCategory():void{
    this.categoryService.getAllFirebaseCategories().subscribe((data) => {
      this.navCategory = data as ICategoryResponse[];
    })
  }

  loadBasket(): void {
    if (localStorage.length > 0 && localStorage.getItem('basket')) {
    this. baskets = JSON.parse(localStorage.getItem('basket') as string);
    }
    this.getTotalPrice();
    this.getCountTotal();
  }

  getTotalPrice(): void {
    this.total = this.baskets.reduce(
      (total: number, prod: IProductResponse) =>
        total + prod.count * prod.price,
      0
    );
  }

  getCountTotal(): void {
    this.count = this.baskets.reduce(
      (count: number, prod: IProductResponse) =>
        count + prod.count,
      0
    );
  }

  updateBasket(): void {
    this.orderService.changeBasket.subscribe(()=>{
      this.loadBasket();
    })
  }


  checkUserLogin(): void{
    const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
    if (currentUser && currentUser.role === ROLE.ADMIN){
      this.isLogin = true;
      this.loginUrl = 'admin';
      this.loginPage = 'Admin';
    } else if (currentUser && currentUser.role === ROLE.USER) {
      this.isLogin = true;
      this.loginUrl = 'cabinet';
      this.loginPage = 'Кабінет';
    }else{
      this.isLogin = false;
      this.loginUrl = '';
      this.loginPage = '';
    }
  }


  checkUpdatesUserLogin(): void{
    this.accountService.isUserLogin$.subscribe(() =>{
      this.checkUserLogin();
    })
  }


  openDialogDelivery(): void {
    this.dialogService.openDialog(false, '800ms', '300ms');
  }

  openUserDialog(): void{
    this.dialog.open(AuthDialogComponent, {
      backdropClass: 'dialog-back',
      panelClass: 'auth-dialog',
      autoFocus: true,

    });
  }

  userDelivery(){
    this.dialogService.selectedOption$.subscribe((option) => {
      this.selectedOption = option;
    });
  }

  openMenuAll() {
    this.isAllMenuOpen = true;
  }

  closeMenuAll() {
    this.isAllMenuOpen = false;
  }

  openMenu() {
    this.isMenuOpen = true;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }

}
