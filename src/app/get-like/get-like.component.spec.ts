import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetLikeComponent } from './get-like.component';

describe('GetLikeComponent', () => {
  let component: GetLikeComponent;
  let fixture: ComponentFixture<GetLikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetLikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetLikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
