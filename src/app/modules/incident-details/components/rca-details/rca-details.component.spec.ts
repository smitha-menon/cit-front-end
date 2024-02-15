import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RCADetailsComponent } from './rca-details.component';

describe('RCADetailsComponent', () => {
  let component: RCADetailsComponent;
  let fixture: ComponentFixture<RCADetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RCADetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RCADetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
