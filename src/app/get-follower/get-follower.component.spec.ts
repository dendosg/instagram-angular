import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFollowerComponent } from './get-follower.component';

describe('GetFollowerComponent', () => {
  let component: GetFollowerComponent;
  let fixture: ComponentFixture<GetFollowerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFollowerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFollowerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
