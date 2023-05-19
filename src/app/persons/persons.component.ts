import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Person, PersonControllerService} from '../../api';
import {PersonsDataSource} from './persons-datasource';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.css'],
})
export class PersonsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Person>;
  dataSource: PersonsDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstname', 'lastname', 'actions'];

  constructor(
    private personApi: PersonControllerService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new PersonsDataSource(personApi);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.dataSource.index();
  }

  removePerson(id: number) {
    this.personApi.deletePerson(id).subscribe(() => {
      this.snackBar.open('Person erfolgreich gelöscht!', 'Close', {
        duration: 3000,
      });
      this.dataSource.index();
    });
  }
}
