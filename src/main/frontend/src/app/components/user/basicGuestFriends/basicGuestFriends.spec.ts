import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicGuestFriendsComponent } from './basicGuestFriends';

describe('BasicGuestFriendsComponent', () => {
  let component: BasicGuestFriendsComponent;
  let fixture: ComponentFixture<BasicGuestFriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicGuestFriendsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicGuestFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
