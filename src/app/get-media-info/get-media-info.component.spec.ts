import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMediaInfoComponent } from './get-media-info.component';

describe('GetMediaInfoComponent', () => {
  let component: GetMediaInfoComponent;
  let fixture: ComponentFixture<GetMediaInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetMediaInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetMediaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
