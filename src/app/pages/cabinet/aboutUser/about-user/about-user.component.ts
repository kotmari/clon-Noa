import { Component } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getAuth } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/shared/services/accounts/account.service';

@Component({
  selector: 'app-about-user',
  templateUrl: './about-user.component.html',
  styleUrls: ['./about-user.component.scss'],
})
export class AboutUserComponent {
  public aboutForm!: FormGroup;
  public user!: any;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.initAboutForm();
    this.loadAbautUser();
  }

  initAboutForm() {
    this.aboutForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phoneNumber: [null, Validators.required],
      address: [null, Validators.required],
    });
  }

  loadAbautUser() {
    const userExists = localStorage.getItem('currentUser');
    if (userExists) {
      this.user = JSON.parse(userExists);
      this.aboutForm.patchValue({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        phoneNumber: this.user.phoneNumber,
        address: this.user.address,
      });
    }
  }

  updateUser() {
    const updatedFields = { ...this.aboutForm.value };
    this.updateProfile(updatedFields);
  }

  async updateProfile(updatedFields: any) {
    const user = getAuth().currentUser;
    if (user) {
      const userId = user.uid;
  
      try {
        await this.accountService.updateUserData(userId, updatedFields);
        this.updateLocalStorage(updatedFields); 
        this.accountService.isUserLogin$.next(true);
        this.toastr.success('Профіль користувача оновлено успішно');
      } catch (error: any) {
        this.toastr.error('Помилка при оновленні даних користувача:', error);
      }
    }
  }

  updateLocalStorage(updatedFields: any) {
    const userExists = localStorage.getItem('currentUser');
    if (userExists) {
      const currentUser = JSON.parse(userExists);
      Object.keys(updatedFields).forEach((key) => {
        if (updatedFields[key]) {
          currentUser[key] = updatedFields[key];
        }
      });
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
  }
  
}
