import {Component, OnInit} from '@angular/core';
import {Person, Summary, SummaryControllerService} from "../../../api";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-duty-overview',
  templateUrl: './duty-overview.component.html',
  styleUrls: ['./duty-overview.component.scss']
})
export class DutyOverviewComponent implements OnInit {
  summary: Observable<Summary>;

  constructor(private summaryApi: SummaryControllerService) {
    this.summary = this.summaryApi.summary();
  }

  ngOnInit(): void {
    this.summaryApi.summary().subscribe((data: Summary) => {
      this.summary = of(data);
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

  sendSummary() {
    this.summaryApi.sendSummary().subscribe(() => {
      this.refreshSummary();
    });
  }

  fillSummary() {
    this.summaryApi.fillSummary().subscribe(url => {
      window.open(url, '_blank');
      this.refreshSummary();
    });
  }
}
