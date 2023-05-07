import {Routes} from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {PersonsComponent} from "./persons/persons.component";

const routeConfig: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard'
  },
  {
    path: 'persons',
    component: PersonsComponent,
    title: 'Persons'
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  }
];

export default routeConfig;
