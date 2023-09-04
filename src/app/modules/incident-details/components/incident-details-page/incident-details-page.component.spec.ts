import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentDetailsPageComponent } from './incident-details-page.component';

describe('IncidentDetailsPageComponent', () => {
  let component: IncidentDetailsPageComponent;
  let fixture: ComponentFixture<IncidentDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncidentDetailsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
