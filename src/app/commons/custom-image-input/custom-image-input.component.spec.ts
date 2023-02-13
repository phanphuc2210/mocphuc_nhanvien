import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomImageInputComponent } from './custom-image-input.component';

describe('CustomImageInputComponent', () => {
  let component: CustomImageInputComponent;
  let fixture: ComponentFixture<CustomImageInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomImageInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomImageInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
