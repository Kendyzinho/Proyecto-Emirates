import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightAddComponent } from './admin-flight-add.component';

describe('AdminFlightAddComponent', () => {
  let component: AdminFlightAddComponent;
  let fixture: ComponentFixture<AdminFlightAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlightAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFlightAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
