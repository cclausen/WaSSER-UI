import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';
import {Person} from "../../api";
import {MenuDialogComponent} from "../components/menu-dialog-component/menu-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private selectedPerson: Person | null = null;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Aktive Personen', cols: 1, rows: 1},
          {title: 'Card 1', cols: 1, rows: 1},
          {title: 'Card 2', cols: 1, rows: 1},
          {title: 'Card 3', cols: 1, rows: 1},
        ];
      }

      return [
        {title: 'Aktive Personen', cols: 1, rows: 1},
        {title: 'Card 1', cols: 1, rows: 1},
        {title: 'Card 2', cols: 2, rows: 1},
        {title: 'Card 3', cols: 1, rows: 2},
      ];
    })
  );

  constructor(
    private dialog: MatDialog,
  ) {
  }

  startShift(person: Person): void {
    // Implement the logic to start the shift for the selected person
    // You can use the `person` object to perform the necessary operations
  }

  endShift(person: Person): void {
    // Implement the logic to end the shift for the selected person
    // You can use the `person` object to perform the necessary operations
  }

  openMenu(person: Person): void {
    this.selectedPerson = person;
    this.dialog.open(MenuDialogComponent, {
      data: {
        person: person,
      },
    });
  }
}
