import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, map, filter, tap } from 'rxjs/internal/operators';
import { distinctUntilChanged } from 'rxjs/internal/operators';
import { switchMap } from 'rxjs/internal/operators';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { QrDisplayComponent } from '../qr-display/qr-display.component';

@Component({
  selector: 'app-note-display',
  templateUrl: './note-display.component.html',
  styleUrls: ['./note-display.component.css']
})
export class NoteDisplayComponent implements OnInit {

  textVar = "";
  placeholderVar = "Enter your notes here....";
  note = "";
  noteCtrl = new FormControl();
  noteId: string;
  @ViewChild('notePad', { static: false }) notePad: ElementRef;

  constructor(private noteService: NoteService, private dialog: MatDialog, ) {

  }

  openAsQR() {
    this.dialog.open(QrDisplayComponent, {
      data: {
        text: this.notePad.nativeElement.innerHTML
      }, panelClass: "qr"
    });
  }


  deleteNote() {
    this.notePad.nativeElement.innerHTML = "";
    this.noteService.deleteNote(this.noteId);
    this.noteId = this.noteService.uuidv4()
  }

  ngOnInit() {
    this.noteId = this.noteService.uuidv4();

    this.noteCtrl.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value) => {
        const note: Note = {
          id: this.noteId,
          text: this.notePad.nativeElement.innerHTML,
          timestamp: new Date().toString()
        };
        this.noteService.currentNote.next(note);
        this.noteService.saveNote(note);
        return of(null);
      })).subscribe();
    this.noteService.currentNote.subscribe((note) => {
      if (this.notePad) {
        if (note && note.id !== this.noteId) {
          this.noteId = note.id;
          this.notePad.nativeElement.innerHTML = note.text;
        }
      }
    })
  }



}
