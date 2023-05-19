import {Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PersonsComponent} from './persons/persons.component';
import {PresencesComponent} from './presences/presences.component';
import {PersonComponent} from './persons/person/person.component';
import {PlaceComponent} from "./places/place/place.component";
import {PlacesComponent} from "./places/places.component";
import {DutiesComponent} from "./duties/duties.component";
import {DutyComponent} from "./duties/duty/duty.component";

const routeConfig: Routes = [
  // Dashboard
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  // Persons
  {
    path: 'persons',
    component: PersonsComponent,
    title: 'Persons',
  },
  {
    path: 'persons/:id',
    component: PersonComponent,
    title: 'Person',
  },
  {
    path: 'persons/new',
    component: PersonComponent,
    title: 'Person',
  },

  // Places
  {
    path: 'places',
    component: PlacesComponent,
    title: 'Place',
  },
  {
    path: 'places/:id',
    component: PlaceComponent,
    title: 'Place',
  },
  {
    path: 'places/new',
    component: PlaceComponent,
    title: 'Place',
  },

  // Duties
  {
    path: 'duties',
    component: DutiesComponent,
    title: 'Duty',
  },
  {
    path: 'duties/:id',
    component: DutyComponent,
    title: 'Duty',
  },
  {
    path: 'duties/new',
    component: DutyComponent,
    title: 'Duty',
  },

  // Presences
  {
    path: 'presences',
    component: PresencesComponent,
    title: 'Presences',
  },
];

export default routeConfig;
