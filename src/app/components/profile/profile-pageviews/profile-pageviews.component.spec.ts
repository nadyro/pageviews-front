import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageviewsComponent } from './profile-pageviews.component';

describe('ProfilePageviewsComponent', () => {
  let component: ProfilePageviewsComponent;
  let fixture: ComponentFixture<ProfilePageviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfilePageviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePageviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
