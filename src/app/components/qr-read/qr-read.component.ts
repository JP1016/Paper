import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-qr-read',
  templateUrl: './qr-read.component.html',
  styleUrls: ['./qr-read.component.css']
})
export class QrReadComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<QrReadComponent>) { }

  ngOnInit() {
  }

}
