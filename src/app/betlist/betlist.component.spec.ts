import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetlistComponent } from './betlist.component';

describe('BetlistComponent', () => {
  let component: BetlistComponent;
  let fixture: ComponentFixture<BetlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BetlistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BetlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
