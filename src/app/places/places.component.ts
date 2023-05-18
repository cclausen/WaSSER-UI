import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Place, PlaceControllerService} from '../../api';
import {PlacesDatasource} from './places-datasource';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css'],
})
export class PlacesComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Place>;
  dataSource: PlacesDatasource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'officialName', 'district', 'actions'];

  constructor(
    private placeApi: PlaceControllerService,
    private snackBar: MatSnackBar
  ) {
    this.dataSource = new PlacesDatasource(placeApi);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnInit(): void {
    this.dataSource.index();
  }

  removePlace(id: number) {
    this.placeApi.deletePlace(id).subscribe(() => {
      this.snackBar.open('Person removed successfully!', 'Close', {
        duration: 3000,
      });
      this.dataSource.index();
    });
  }
}
