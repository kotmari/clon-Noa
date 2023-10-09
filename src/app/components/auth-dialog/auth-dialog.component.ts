import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Firestore, docData, doc, setDoc } from '@angular/fire/firestore';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { ToastrService } from 'ngx-toastr';
import { ROLE } from 'src/shared/constants/constant';
import { IRegisterFull } from 'src/shared/interfaces/login/UserRegistr.interface';
import { AccountService } from 'src/shared/services/accounts/account.service';


@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.scss']
})
export class AuthDialogComponent implements OnInit {
  public loginForm!: FormGroup;
  public registerForm!: FormGroup;
  public registerDate!: IRegisterFull;
  public userEmail = '';
  public checkPassword = false;
  public showRegistrationForm = false;
  public showLoginForm = true;
  public showPasswordResetForm = false;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  


  constructor (
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AuthDialogComponent>,
    private router: Router,
    private auth: Auth,
    private afs: Firestore,
    private accountService: AccountService,
    private toastr: ToastrService
 ) {}

  ngOnInit(): void {
    this.initLoginForm();
    this.initRegisterForm();
}

  initLoginForm(): void{
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    })
  }

  initRegisterForm(): void{
    this.registerForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmedPassword:[null, [Validators.required]],
      agreeToTerms:[false, Validators.requiredTrue]
    })
  }


loginUser(): void{
    const { email, password } =  this.loginForm.value;
    this.login(email, password).then(() => {
      this.toastr.info('User successfully login');
      console.log(email, password)
      this.dialogRef.close();
    }).catch(e => {
      this.toastr.error(e.message);
    })
  }

  async login(email: string, password: string): Promise<any>{
    const credential = await signInWithEmailAndPassword(this.auth, email, password);
    docData(doc(this.afs, 'users', credential.user.uid)).subscribe(user => {
      const currentUser = { ...user, uid: credential.user.uid };
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      if (user && user['role'] === ROLE.USER){
        console.log('ok')
        this.router.navigate(['/cabinet']);
        }else if (user && user['role'] === ROLE.ADMIN){
        this.router.navigate(['/admin']);
        }
        this.accountService.isUserLogin$.next(true);
    }, (e) => {
      console.log('error', e);
    })
  }

  registerUser(): void {
    const{ email, password } = this.registerForm.value;
    this.registerDate = this.registerForm.value;
    this.emailSignUp(email, password).then(() =>{
      this.toastr.success('User successfully created');
      this.showRegistrationForm = false;
      this.showLoginForm = true;
      this.registerForm.reset();
    }).catch(e => {
      this.toastr.error('not', e.message);
    })
  }


 async emailSignUp(email: string, password: string): Promise<any> {
  const credential = await createUserWithEmailAndPassword(this.auth, email, password);
  const user = {
    email: credential.user.email,
    firstName: this.registerDate.firstName,
    lastName: this.registerDate.lastName,
    phoneNumber: this.registerDate.phoneNumber,
    address: '',
    orders: [],
    role: 'USER'
  };
  setDoc(doc(this.afs, 'users', credential.user.uid), user);
 }

 forgotPassword() {
  if(this.emailFormControl.value)
  this.resetEmail(this.emailFormControl.value);
 }

async resetEmail(email: string): Promise<void> {
  try {
    const auth = getAuth();
    await sendPasswordResetEmail(auth, email);
    this.toastr.success('Запит на скидання паролю відправлено успішно.');
    this.dialogRef.close();
  } catch (error) {
    this.toastr.error('Помилка при відправці запиту на скидання паролю: ' + error);
  }
}


 changeLoginForm(): void{
  this.showLoginForm = true;
  this.showPasswordResetForm = false;
  this.showRegistrationForm = false;
 }

 changeRegistrationForm(){
  this.showLoginForm = false;
  this.showRegistrationForm= true;
 }
 changePasswordResetForm(){
  this.showLoginForm = false;
  this.showPasswordResetForm = true;
 }

 checkConfirmedPassword():void{
    this.checkPassword = this.password.value === this.confirmed.value;
    if(this.password.value !== this.confirmed.value){
      this.registerForm.controls['confirmedPassword'].setErrors({
        matchError: 'Password confirmation doesnt match'
      })
    }
 }

 get password(): AbstractControl{
    return this.registerForm.controls['password'];
 }
  get confirmed(): AbstractControl{
    return this.registerForm.controls['confirmedPassword'];
  }

  checkVisibilityError(control: string, name: string): boolean | null{
    return this.registerForm.controls[control].errors?.[name]
  }

 

  getErrorMessage() {
    if (this.emailFormControl.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailFormControl.hasError('email') ? 'Not a valid email' : '';
  }

}
