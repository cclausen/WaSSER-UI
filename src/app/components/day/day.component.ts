import {Component, OnInit} from '@angular/core';
import {Day, DayControllerService, Place, PlaceControllerService} from "../../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.css']
})
export class DayComponent implements OnInit {
  places: Place[] = [];
  dayForm: FormGroup = new FormGroup({});

  constructor(private dayApi: DayControllerService, private placeApi: PlaceControllerService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.placeApi.indexPlaces().subscribe(places => {
      this.places = places;
      this.loadDay();
    });
  }

  loadDay(): void {
    this.dayApi.getToday().subscribe((day: Day) => {
      this.dayForm.patchValue(day);
    });
  }

  private createForm() {
    this.dayForm = new FormGroup({
      id: new FormControl<number | null>({value: null, disabled: true}, {nonNullable: false}),
      place: new FormControl<Place | null>(null, Validators.required),
      date: new FormControl<string>({value: '', disabled: true}),
      amountOfVisitors: new FormControl<number>(0, [Validators.min(0), Validators.max(5)]),
      firstResponder: new FormControl<number>(0, Validators.min(0)),
      reanimations: new FormControl<number>(0, Validators.min(0)),
      aed: new FormControl<number>(0, Validators.min(0)),
      helpPersons: new FormControl<number>(0, Validators.min(0)),
      wasMedical: new FormControl<number>(0, Validators.min(0)),
      wasLifeThreatening: new FormControl<number>(0, Validators.min(0)),
      wasInWater: new FormControl<number>(0, Validators.min(0)),
      wasLifeThreateningForHelper: new FormControl<number>(0, Validators.min(0)),
      wasDead: new FormControl<number>(0, Validators.min(0)),
      wasDrowned: new FormControl<number>(0, Validators.min(0)),
      helpThings: new FormControl<number>(0, Validators.min(0)),
      helpEnvironment: new FormControl<number>(0, Validators.min(0)),
      helpAnimals: new FormControl<number>(0, Validators.min(0)),
    });
  }

  saveDay() {
    if (this.dayForm.valid) {
      const formData = this.dayForm.getRawValue() as Day;
      this.dayApi.updateDay(formData).subscribe((day) => {
        this.dayForm.patchValue(day);
      });
    }
  }

  comparePlaces(place1: Place, place2: Place): boolean {
    return place1 && place2 ? place1.id === place2.id : place1 === place2;
  }
}
