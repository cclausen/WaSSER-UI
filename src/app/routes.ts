import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonsComponent } from './persons/persons.component';
import { PresencesComponent } from './presences/presences.component';
import { PersonComponent } from './persons/person/person.component';

const routeConfig: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
  },
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

  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'presences',
    component: PresencesComponent,
    title: 'Presences',
  },
];

export default routeConfig;
