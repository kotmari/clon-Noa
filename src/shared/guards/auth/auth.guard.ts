import { inject, Injectable, ProviderToken } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLE } from 'src/shared/constants/constant';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private router: Router
  ){}


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

      console.log(currentUser)
      if (currentUser && (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)){
      return true;
      }
      this.router.navigate(['']);
      return false;
  }


  // canActivate(): boolean {
  //   const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);

  //   if (currentUser && (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)) {
  //     return true;
  //   }

  //   this.router.navigate(['']);
  //   return false;
  //}
  
}

// export const AuthGuard: CanActivateFn = (_route, state) => {
//   const router = inject(Router);
//   const currentUser = JSON.parse(localStorage.getItem('currentUser') as string);
//       if (currentUser && (currentUser.role === ROLE.ADMIN || currentUser.role === ROLE.USER)){
//       return true;
//       }
//       router.navigate(['']);
//       return false;
  
// }


