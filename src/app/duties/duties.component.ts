import {Component, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {Duty, DutyControllerService} from "../../api";
import {DutiesDataSource} from "./duties-datasource";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-duties',
  templateUrl: './duties.component.html',
  styleUrls: ['./duties.component.scss']
})
export class DutiesComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Duty>;
  dataSource: DutiesDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'date', 'actions'];

  constructor(
    private dutyApi: DutyControllerService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new DutiesDataSource(dutyApi);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.dataSource.index();
  }

  removeDuty(id: number) {
    this.dutyApi.deleteDuty(id).subscribe(() => {
      this.snackBar.open('Dienst erfolgreich gelöscht!', 'Close', {
        duration: 3000,
      });
      this.dataSource.index();
    });
  }

}
