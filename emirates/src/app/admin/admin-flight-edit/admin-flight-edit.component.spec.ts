import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightEditComponent } from './admin-flight-edit.component';

describe('AdminFlightEditComponent', () => {
  let component: AdminFlightEditComponent;
  let fixture: ComponentFixture<AdminFlightEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlightEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFlightEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
