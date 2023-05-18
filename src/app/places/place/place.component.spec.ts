import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PlaceComponent} from './place.component';

describe('PersonComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlaceComponent],
    });
    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
