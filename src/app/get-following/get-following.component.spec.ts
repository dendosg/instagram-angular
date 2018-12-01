import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFollowingComponent } from './get-following.component';

describe('GetFollowingComponent', () => {
  let component: GetFollowingComponent;
  let fixture: ComponentFixture<GetFollowingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFollowingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetFollowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
