import {MatDialogRef} from "@angular/material";
import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-user-detail-dialog',
  templateUrl: './user-detail-dialog.component.pug',
  styleUrls: ['./user-detail-dialog.component.sass']
})
export class UserDetailDialogComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<UserDetailDialogComponent>) {}

  ngOnInit() {
  }
}
