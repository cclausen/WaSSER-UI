import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Component, Inject} from "@angular/core";
import {Person} from "../../../api";
import {DashboardComponent} from "../../dashboard/dashboard.component";

@Component({
  selector: 'app-menu-dialog',
  template: `
    <h2 mat-dialog-title>Menu</h2>
    <mat-dialog-content>
      <p>Selected Person: {{ data.person.firstname }} {{ data.person.lastname }}</p>
      <button mat-raised-button color="primary" (click)="startShift()">Start Shift</button>
      <button mat-raised-button color="warn" (click)="endShift()">End Shift</button>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button [mat-dialog-close]="true">Close</button>
    </mat-dialog-actions>
  `,
})
export class MenuDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { person: Person },
    private dialogRef: MatDialogRef<MenuDialogComponent>,
    private dashboardComponent: DashboardComponent
  ) {
  }

  startShift(): void {
    this.dashboardComponent.startShift(this.data.person);
    this.dialogRef.close();
  }

  endShift(): void {
    this.dashboardComponent.endShift(this.data.person);
    this.dialogRef.close();
  }
}
