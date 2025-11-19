import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightsListComponent } from './admin-flights-list.component';

describe('AdminFlightsListComponent', () => {
  let component: AdminFlightsListComponent;
  let fixture: ComponentFixture<AdminFlightsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminFlightsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFlightsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
