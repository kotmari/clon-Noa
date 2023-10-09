import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit{


  public changePasswordForm!: FormGroup;
  public checkPassword = false;
  newPasswordUser = '';


  public hide = true;
  public hide1 = true;
  public hide2 = true;


 constructor(
   private fb:FormBuilder,
   private router: Router,
   private auth: Auth,
   private toastr: ToastrService
 ) {}

 ngOnInit() {
   this.initChangePasswordForm();
 }

  initChangePasswordForm(): void{
    this.changePasswordForm = this.fb.group({
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmedPassword:[null, [Validators.required]]
    })
  }
 
  changePasswordUser(){
    this.changePassword();
    this.resetForm();
  }

   async changePassword() {
      const oldPassword = this.changePasswordForm.value.currentPassword;
      const newPassword = this.changePasswordForm.value.newPassword;
      try {
        const user = getAuth().currentUser;
         if (user) {
          const credential = EmailAuthProvider.credential(user.email!, oldPassword);
          await reauthenticateWithCredential(user, credential);
          await updatePassword(user, newPassword);
          this.toastr.success('Пароль оновлено успішно');
        } else {
          this.toastr.error('Користувач не автентифікований');
        }
      } catch (error:any) {
        this.toastr.error('Помилка при зміні паролю:', error.message);
      }
    }
  
        
  

  checkConfirmedPassword():void{
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value){
      this.changePasswordForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
  }

  get password(): AbstractControl{
    return this.changePasswordForm.controls['newPassword'];
  }
  get confirmed(): AbstractControl{
    return this.changePasswordForm.controls['confirmedPassword'];
  }
  checkVisibilityError(control: string, name: string): boolean | null{
    return this.changePasswordForm.controls[control].errors?.[name]
  }

  resetForm():void{
   this.changePasswordForm.reset();
  }

}
