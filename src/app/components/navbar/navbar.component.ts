import { Component, OnInit, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { QrReadComponent } from '../qr-read/qr-read.component';
import { MatDialog } from '@angular/material';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isDarkMode = true;

  ngOnInit() {
    const theme = localStorage.getItem("theme") || "light-mode";
    this.switchTheme(theme);
  }

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2, private dialog: MatDialog,
    private noteService: NoteService) {
  }


  readQR() {
    const dialogRef = this.dialog.open(QrReadComponent, {
      data: {
        text: null
      }, panelClass: "qr"
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.success) {
        this.noteService.newNote(result.data);
      }
    })
  }


  toggleSidebar() {
    const isSideBarVisible = this.noteService.isSideBarVisible.getValue();
    this.noteService.isSideBarVisible.next(!isSideBarVisible);
  }

  toggleMode() {
    let mode;
    if (document.body.classList.contains("dark-mode")) mode = "light-mode";
    else mode = "dark-mode";

    this.switchTheme(mode);
    localStorage.setItem("theme", mode);
  }

  switchTheme(mode) {
    let oldMode;
    if (mode === "light-mode") {
      oldMode = "dark-mode";
      this.isDarkMode = false;
    }
    if (mode === "dark-mode") {
      this.isDarkMode = true;
      oldMode = "light-mode";
    }

    this.renderer.removeClass(this.document.body, oldMode);
    this.renderer.addClass(this.document.body, mode);
  }
}
