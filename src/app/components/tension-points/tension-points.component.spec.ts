import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TensionPointsComponent } from './tension-points.component';

describe('TensionPointsComponent', () => {
  let component: TensionPointsComponent;
  let fixture: ComponentFixture<TensionPointsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TensionPointsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TensionPointsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
