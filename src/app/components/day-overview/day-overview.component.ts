import {Component, OnInit} from '@angular/core';
import {Person, Summary, SummaryControllerService} from "../../../api";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-day-overview',
  templateUrl: './day-overview.component.html',
  styleUrls: ['./day-overview.component.scss']
})
export class DayOverviewComponent implements OnInit {
  summary: Observable<Summary>;

  constructor(private summaryApi: SummaryControllerService) {
    this.summary = this.summaryApi.summary();
  }

  ngOnInit(): void {
    this.summaryApi.summary().subscribe((data: Summary) => {
      console.log(data); // Check the data received from the API
      this.summary = of(data); // Assign the data to the summary variable
    });
  }

  refreshSummary(): void {
    this.summary = this.summaryApi.summary();
  }

  getPersonList(persons: Set<Person> | undefined) {
    if (persons) {
      let personArray = Array.from(persons);
      return personArray.map(person => person.firstname + ' ' + person.lastname).join(", ") + ' (' + personArray.length + ')';
    } else {
      return "";
    }
  }
}
