import {NgModule} from '@angular/core';
import {BrowserModule, provideProtractorTestingSupport,} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {NavigationComponent} from './navigation/navigation.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {PersonsComponent} from './persons/persons.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import routeConfig from './routes';
import {provideRouter, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {PresencesComponent} from './presences/presences.component';
import {PersonComponent} from './persons/person/person.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MAT_DATE_FORMATS, MatDateFormats, MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from "@angular/material/dialog";
import {ActivePersonsComponent} from './components/active-persons/active-persons.component';
import {MomentModule} from "ngx-moment";
// Set the locale to German
import 'moment/locale/de';
import {DayOverviewComponent} from './components/day-overview/day-overview.component';
import {PlacesComponent} from "./places/places.component";
import {PlaceComponent} from "./places/place/place.component";
import {DayComponent} from './components/day/day.component';
import {MatSliderModule} from "@angular/material/slider";

const MY_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: 'yyyy-MM-dd',
  },
  display: {
    dateInput: 'yyyy-MM-dd',
    monthYearLabel: 'MMM yyyy',
    dateA11yLabel: 'yyyy-MM-dd',
    monthYearA11yLabel: 'MMMM yyyy',
  },
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    DashboardComponent,
    PersonsComponent,
    PlacesComponent,
    PlaceComponent,
    PresencesComponent,
    PersonComponent,
    ActivePersonsComponent,
    DayOverviewComponent,
    DayComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {path: 'crisis-list', component: DashboardComponent},
      {path: 'heroes-list', component: PersonsComponent},
    ]),
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    HttpClientModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatDialogModule,
    MomentModule,
    MatSliderModule,
    FormsModule
  ],
  providers: [
    provideProtractorTestingSupport(),
    provideRouter(routeConfig),
    {provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
