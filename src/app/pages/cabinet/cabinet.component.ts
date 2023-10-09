import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/shared/services/accounts/account.service';

@Component({
  selector: 'app-cabinet',
  templateUrl: './cabinet.component.html',
  styleUrls: ['./cabinet.component.scss']
})
export class CabinetComponent {

  constructor(
    private router: Router,
    private accountService: AccountService
  ){}

  ngOnInit(): void {

  }
  logout(): void{
    this.router.navigate(['']);
    localStorage.removeItem('currentUser');
    this.accountService.isUserLogin$.next(true);
  }

}
