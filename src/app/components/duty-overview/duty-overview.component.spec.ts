import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DutyOverviewComponent} from './duty-overview.component';

describe('DutyOverviewComponent', () => {
  let component: DutyOverviewComponent;
  let fixture: ComponentFixture<DutyOverviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DutyOverviewComponent]
    });
    fixture = TestBed.createComponent(DutyOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
