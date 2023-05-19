import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Person, PersonControllerService, Presence, PresenceControllerService} from "../../../api";
import {MatSnackBar} from "@angular/material/snack-bar";
import StatusEnum = Person.StatusEnum;

interface PresencePerson extends Person {
  presence: Presence;
}

@Component({
  selector: 'app-active-persons',
  templateUrl: './active-persons.component.html',
  styleUrls: ['./active-persons.component.scss']
})
export class ActivePersonsComponent implements OnInit, OnChanges {
  activePersons: Person[] = [];
  openPresences: Presence[] = [];
  augmentedActivePersons: PresencePerson[] = [];
  guestPersons: Person[] = [];
  augmentedGuestPersons: PresencePerson[] = [];

  constructor(private presenceApi: PresenceControllerService,
              private snackBar: MatSnackBar,
              private personApi: PersonControllerService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  private augmentPersons(persons: Person[]) {
    return persons.map(person => {
      return {
        ...person,
        presence: this.openPresenceForPerson(person)
      } as PresencePerson
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["activePersons"] || changes["openPresences"]) {
      this.augmentedActivePersons = this.augmentPersons(this.activePersons);
      this.augmentedActivePersons = this.augmentPersons(this.guestPersons);
    }
  }

  startGuarding(person: Person): void {
    this.presenceApi.startPresence(person.id!).subscribe(() => {
      this.refresh();
      this.snackBar.open('Guarding started successfully!', 'Close', {
        duration: 3000,
      });
    });
  }

  stopGuarding(person: PresencePerson): void {
    this.presenceApi.stopPresence(person.presence.id).subscribe(() => {
      this.refresh();
      this.snackBar.open('Guarding stopped successfully!', 'Close', {
        duration: 3000,
      });
    });
  }

  toggleGuarding(person: PresencePerson) {
    if (person.presence) {
      this.stopGuarding(person);
    } else {
      this.startGuarding(person);
    }
  }

  openPresenceForPerson(person: Person) {
    return this.openPresences.find(p => p.person.id === person.id);
  }

  private refresh() {
    this.personApi.getPersonsByStatus(StatusEnum.Active).subscribe(persons => {
      this.activePersons = persons;
      this.augmentedActivePersons = this.augmentPersons(this.activePersons);
    });
    this.personApi.getPersonsByStatus(StatusEnum.Guest).subscribe(persons => {
      this.guestPersons = persons;
      this.augmentedGuestPersons = this.augmentPersons(this.guestPersons);
    });
    this.presenceApi.allOpen().subscribe(presences => {
      this.openPresences = presences;
      this.augmentedActivePersons = this.augmentPersons(this.activePersons);
      this.augmentedGuestPersons = this.augmentPersons(this.guestPersons);
    });
  }

  mergeAndSort() {
    let merged = this.augmentedActivePersons.concat(this.augmentedGuestPersons);
    return merged.sort((a: PresencePerson, b: PresencePerson) => {
      // Sort by presence type (open presences first)
      const aIsOpen = a.presence;
      const bIsOpen = b.presence;

      if (aIsOpen && !bIsOpen) {
        return -1; // a comes before b
      }
      if (!aIsOpen && bIsOpen) {
        return 1; // b comes before a
      }

      // Sort by presence start date (oldest to newest)
      if (a.presence && b.presence) {
        const aStartDate = new Date(a.presence.start);
        const bStartDate = new Date(b.presence.start);

        if (aStartDate < bStartDate) {
          return -1; // a comes before b
        }
        if (aStartDate > bStartDate) {
          return 1; // b comes before a
        }
      }

      // Sort by status (active before guests)
      if (a.status !== b.status) {
        const statusOrder = [
          Person.StatusEnum.Active,
          Person.StatusEnum.Guest,
          Person.StatusEnum.Ill,
          Person.StatusEnum.Retired,
        ];
        return statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
      }

      let firstname = a.firstname.localeCompare(b.firstname);
      if (firstname !== 0)
        return firstname;

      let lastname = a.lastname.localeCompare(b.lastname);
      if (lastname !== 0)
        return lastname;
      // Sort by other criteria if needed

      return 0; // a and b are considered equal
    });
  }
}
