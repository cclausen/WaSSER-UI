import {Component, inject} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  private breakpointObserver = inject(BreakpointObserver);

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({matches}) => {
      if (matches) {
        return [
          {title: 'Aktive Personen', cols: 1, rows: 1},
          {title: 'Tages-Übersicht', cols: 1, rows: 1},
          {title: 'Tag', cols: 2, rows: 2},
        ];
      }

      return [
        {title: 'Aktive Personen', cols: 1, rows: 1},
        {title: 'Tages-Übersicht', cols: 1, rows: 1},
        {title: 'Tag', cols: 2, rows: 2},
      ];
    })
  );

  constructor() {
  }
}
