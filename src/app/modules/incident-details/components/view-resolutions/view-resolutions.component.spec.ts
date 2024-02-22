import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewResolutionsComponent } from './view-resolutions.component';

describe('ViewResolutionsComponent', () => {
  let component: ViewResolutionsComponent;
  let fixture: ComponentFixture<ViewResolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewResolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewResolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
