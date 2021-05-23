import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderOnlineComponent } from './header-online.component';

describe('HeaderOnlineComponent', () => {
  let component: HeaderOnlineComponent;
  let fixture: ComponentFixture<HeaderOnlineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderOnlineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderOnlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
