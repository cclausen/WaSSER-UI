import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivePersonsComponent } from './active-persons.component';

describe('ActivePersonsComponent', () => {
  let component: ActivePersonsComponent;
  let fixture: ComponentFixture<ActivePersonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActivePersonsComponent]
    });
    fixture = TestBed.createComponent(ActivePersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
