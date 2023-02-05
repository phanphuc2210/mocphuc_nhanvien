import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppStateInterface } from 'src/app/models/appState.interface';
import { errorSelector } from 'src/app/store/productStore/selectors';
import * as ProductActions from 'src/app/store/productStore/action';

@Component({
  selector: 'app-toast-err',
  templateUrl: './toast-err.component.html',
  styleUrls: ['./toast-err.component.scss']
})
export class ToastErrComponent implements OnInit {
  error$!: Observable<string | undefined>

  constructor(private store: Store<AppStateInterface>) {
    this.error$ = this.store.pipe(select(errorSelector))
  }

  ngOnInit(): void {
  }

  public closeToast() {
    this.store.dispatch(ProductActions.setErrorNull())
  }
}
