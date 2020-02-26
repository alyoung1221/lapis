import { async, ComponentFixture, TestBed } from '@angular/core/testing';

<<<<<<< HEAD:src/app/shared/hobbycard/hobbycard.component.spec.ts
import { HobbycardComponent } from './hobbycard.component';

describe('HobbycardComponent', () => {
  let component: HobbycardComponent;
  let fixture: ComponentFixture<HobbycardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbycardComponent ]
=======
import { FriendsComponent } from './friends.component';

describe('FriendsComponent', () => {
  let component: FriendsComponent;
  let fixture: ComponentFixture<FriendsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FriendsComponent ]
>>>>>>> master:src/app/components/friends/friends.component.spec.ts
    })
    .compileComponents();
  }));

  beforeEach(() => {
<<<<<<< HEAD:src/app/shared/hobbycard/hobbycard.component.spec.ts
    fixture = TestBed.createComponent(HobbycardComponent);
=======
    fixture = TestBed.createComponent(FriendsComponent);
>>>>>>> master:src/app/components/friends/friends.component.spec.ts
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
