import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Place, PlaceControllerService} from '../../../api';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-person',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
})
export class PlaceComponent implements OnInit {
  placeForm: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private placeApi: PlaceControllerService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    let placeId = Number(this.route.snapshot.paramMap.get('id'));
    if (placeId) {
      this.placeApi.getPlace(placeId).subscribe((place) => {
        this.placeForm.patchValue(place);
      });
    }
    this.placeForm = this.formBuilder.group({
      id: [null],
      name: ['', Validators.required],
      officialName: ['', Validators.required],
      district: ['', Validators.required],
    });
  }

  submitForm(): void {
    if (this.placeForm.valid) {
      const formData = this.placeForm.value as Place;
      if (!formData.id) {
        this.placeApi.createPlace(formData).subscribe((place) => {
          this.snackBar.open('Ort erfolgreich angelegt!', 'Close', {
            duration: 3000,
          });
          this.placeForm.patchValue(place);
          this.resetForm();
        });
      } else {
        this.placeApi.updatePlace(formData).subscribe((person) => {
          this.snackBar.open('Ort erfolgreich aktualisiert!', 'Close', {
            duration: 3000,
          });
          this.placeForm.patchValue(person);
          this.resetForm();
        });
      }
    } else {
      // Form is invalid, handle error or display validation messages
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000,
      });
      this.placeForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.placeForm.reset();
    this.placeForm.markAsUntouched();
  }

}
