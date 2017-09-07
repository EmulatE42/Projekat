import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSomethingComponent } from './add-something.component';

describe('AddSomethingComponent', () => {
  let component: AddSomethingComponent;
  let fixture: ComponentFixture<AddSomethingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSomethingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSomethingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
