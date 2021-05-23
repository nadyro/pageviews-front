import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImprovalComponent } from './improval.component';

describe('ImprovalComponent', () => {
  let component: ImprovalComponent;
  let fixture: ComponentFixture<ImprovalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImprovalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
