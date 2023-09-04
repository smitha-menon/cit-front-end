import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDetailedStepsComponent } from './view-detailed-steps.component';

describe('ViewDetailedStepsComponent', () => {
  let component: ViewDetailedStepsComponent;
  let fixture: ComponentFixture<ViewDetailedStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewDetailedStepsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDetailedStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
