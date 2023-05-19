import {Component, OnInit} from '@angular/core';
import {Duty, DutyControllerService, Place, PlaceControllerService} from "../../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.css']
})
export class DutyComponent implements OnInit {
  places: Place[] = [];
  dutyForm: FormGroup = new FormGroup({});
  expand: boolean = false;

  constructor(private dutyApi: DutyControllerService, private placeApi: PlaceControllerService) {
  }

  ngOnInit(): void {
    this.createForm();
    this.loadPlaces();
  }

  loadPlaces(): void {
    this.placeApi.indexPlaces().subscribe(places => {
      this.places = places;
      this.loadDuty();
    });
  }

  loadDuty(): void {
    this.dutyApi.getToday().subscribe((duty: Duty) => {
      this.dutyForm.patchValue(duty);
    });
  }

  private createForm() {
    this.dutyForm = new FormGroup({
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

  saveDuty() {
    if (this.dutyForm.valid) {
      const formData = this.dutyForm.getRawValue() as Duty;
      this.dutyApi.updateDuty(formData).subscribe((duty) => {
        this.dutyForm.patchValue(duty);
      });
    }
  }

  comparePlaces(place1: Place, place2: Place): boolean {
    return place1 && place2 ? place1.id === place2.id : place1 === place2;
  }

  increase(attribute: string) {
    const current = this.dutyForm.controls[attribute].value;
    this.dutyForm.controls[attribute].setValue(current + 1);
  }

  updateAmountOfVisitors(value: number) {
    this.dutyForm.controls['amountOfVisitors'].setValue(value);
  }

  visitorString(value: string) {
    switch (value) {
      case "0":
        return 'Kein einziger Besucher';
      case "1":
        return 'Da war jemand am Strand';
      case "2":
        return 'Es gab Gruppenbildung';
      case "3":
        return 'Es war gut besucht';
      case "4":
        return 'Schöner Trubel';
      case "5":
        return 'Man musste Liegeplätze suchen';
      default:
        return 'Keine Angabe';
    }
  }
}
