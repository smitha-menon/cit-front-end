import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieIncidentListComponent } from './pie-incident-list.component';

describe('PieIncidentListComponent', () => {
  let component: PieIncidentListComponent;
  let fixture: ComponentFixture<PieIncidentListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieIncidentListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieIncidentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
