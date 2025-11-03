import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private toastr: ToastrService) {}

  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean {
    const token = localStorage.getItem('token');

    if (token) return true;

    this.toastr.error('Você precisa estar logado para acessar esta página', 'Atenção', {
      positionClass: 'toast-top-right',
      timeOut: 4000,
    });

    this.router.navigate(['/login']);
    return false;
  }
}
