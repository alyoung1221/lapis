import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbycardComponent } from './hobbycard.component';

describe('HobbycardComponent', () => {
  let component: HobbycardComponent;
  let fixture: ComponentFixture<HobbycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbycardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbycardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
