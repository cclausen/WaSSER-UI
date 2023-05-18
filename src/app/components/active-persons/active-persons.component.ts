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
  augmentedPersons: PresencePerson[] = [];

  constructor(private presenceApi: PresenceControllerService,
              private snackBar: MatSnackBar,
              private personApi: PersonControllerService) {
  }

  ngOnInit(): void {
    this.refresh();
  }

  private augmentPersons() {
    return this.activePersons.map(person => {
      return {
        ...person,
        presence: this.openPresenceForPerson(person)
      } as PresencePerson
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["activePersons"] || changes["openPresences"]) {
      this.augmentedPersons = this.augmentPersons();
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
      this.augmentedPersons = this.augmentPersons();
    });
    this.presenceApi.allOpen().subscribe(presences => {
      this.openPresences = presences;
      this.augmentedPersons = this.augmentPersons();
    });
  }
}
