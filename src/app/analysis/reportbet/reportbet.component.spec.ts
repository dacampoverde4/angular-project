import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportbetComponent } from './reportbet.component';

describe('ReportbetComponent', () => {
  let component: ReportbetComponent;
  let fixture: ComponentFixture<ReportbetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReportbetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportbetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
