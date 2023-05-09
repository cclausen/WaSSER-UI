import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Person, PersonControllerService} from "../../../api";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  personForm: FormGroup = new FormGroup({});
  statusOptions: string[] = Object.values(Person.StatusEnum);
  lifeguardOptions: string[] = Object.values(Person.LifeguardEnum);


  constructor(private formBuilder: FormBuilder,
              private personApi: PersonControllerService,
              private snackBar: MatSnackBar,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    let personId = Number(this.route.snapshot.paramMap.get('id'));
    if (personId) {
      this.personApi.getPerson(personId).subscribe((person) => {
        this.personForm.patchValue(person);
      });
    }
    this.personForm = this.formBuilder.group({
      id: [null],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      status: [null],
      lifeguard: [null],
      lifeguardFrom: [''],
      fitness: ['']
    });
  }

  submitForm(): void {
    if (this.personForm.valid) {
      const formData = this.personForm.value as Person;
      if (!formData.id) {
        this.personApi.create(formData).subscribe((person) => {
          this.snackBar.open('Person created successfully!', 'Close', {
            duration: 3000
          });
          this.personForm.patchValue(person);
          this.resetForm();
        })
      } else {
        this.personApi.update(formData.id, formData).subscribe((person) => {
          this.snackBar.open('Person updated successfully!', 'Close', {
            duration: 3000
          });
          this.personForm.patchValue(person);
          this.resetForm();
        })
      }
    } else {
      // Form is invalid, handle error or display validation messages
      this.snackBar.open('Please fill in all required fields.', 'Close', {
        duration: 3000
      });
      this.personForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.personForm.reset();
    this.personForm.markAsUntouched();
  }

  convertToDate(dateArray: number[]): Date | null {
    if (dateArray && dateArray.length === 3) {
      const [year, month, day] = dateArray;
      return new Date(year, month - 1, day);
    }
    return null;
  }
}
