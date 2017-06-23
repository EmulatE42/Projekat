import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveRestComponent } from './reserve-rest.component';

describe('ReserveRestComponent', () => {
  let component: ReserveRestComponent;
  let fixture: ComponentFixture<ReserveRestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReserveRestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveRestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
