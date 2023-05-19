import {Component, OnInit} from '@angular/core';
import {Duty, DutyControllerService, Place, PlaceControllerService} from "../../../api";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-duty',
  templateUrl: './duty.component.html',
  styleUrls: ['./duty.component.scss']
})
export class DutyComponent implements OnInit {
  places: Place[] = [];
  dutyId?: number;
  dutyForm: FormGroup = new FormGroup({});
  expand: boolean = false;
  new: boolean = false;

  constructor(private dutyApi: DutyControllerService,
              private placeApi: PlaceControllerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dutyId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.route.snapshot.paramMap.get('id') === 'new') {
      this.new = true;
    }
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
    if (this.dutyId) {
      this.dutyApi.getDuty(this.dutyId).subscribe((duty: Duty) => {
        this.dutyForm.patchValue(duty);
      });
    } else if (!this.new) {
      this.dutyApi.getToday().subscribe((duty: Duty) => {
        this.dutyForm.patchValue(duty);
      });
    }
  }

  private createForm() {
    this.dutyForm = new FormGroup({
      id: new FormControl<number | null>({value: null, disabled: true}, {nonNullable: false}),
      place: new FormControl<Place | null>(null, Validators.required),
      date: new FormControl<string>({value: '', disabled: !this.new}, Validators.required),
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
      formData.date = this.formatDate(formData.date);
      if (this.new) {
        this.dutyApi.createDuty(formData).subscribe((duty) => {
          this.dutyForm.patchValue(duty);
          this.new = false;
        });
      } else {
        this.dutyApi.updateDuty(formData).subscribe((duty) => {
          this.dutyForm.patchValue(duty);
        });
      }
    }
  }

  comparePlaces(place1: Place, place2: Place): boolean {
    return place1 && place2 ? place1.id === place2.id : place1 === place2;
  }

  increase(attribute: string) {
    const current = this.dutyForm.controls[attribute].value;
    this.dutyForm.controls[attribute].setValue(current + 1);
    this.dutyForm.markAsDirty();
  }

  updateAmountOfVisitors(value: number) {
    this.dutyForm.controls['amountOfVisitors'].setValue(value);
  }

  visitorString(value: string | number) {
    switch (value.toString()) {
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

  convertToDate(dateString: string): Date | null {
    if (dateString) {
      return new Date(dateString);
    }
    return null;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return `${date.getFullYear()}-${this.addZeroPrefix(date.getMonth() + 1)}-${this.addZeroPrefix(date.getDate())}`;
  }

  private addZeroPrefix(value: number): string {
    return value < 10 ? `0${value}` : value.toString();
  }
}
