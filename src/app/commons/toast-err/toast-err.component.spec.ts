import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToastErrComponent } from './toast-err.component';

describe('ToastErrComponent', () => {
  let component: ToastErrComponent;
  let fixture: ComponentFixture<ToastErrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToastErrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToastErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
