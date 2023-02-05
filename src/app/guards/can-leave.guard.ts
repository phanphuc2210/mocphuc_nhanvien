import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CanLeaveGuard implements CanDeactivate<unknown> {
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let canLeave: any;
      canLeave = Swal.fire({
        title: '<p class="text-xl text-slate-300">Bạn thật sự muốn rời trang này?</p>',
        background: '#000',
        showCancelButton: true,
        cancelButtonText: 'Hủy',
        confirmButtonText: 'Rời trang',
        confirmButtonColor: '#1a56db',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          return true;
        } else {
          return false;
        }
      })
    return canLeave;
  }
  
}
