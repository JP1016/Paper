import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  public currentNote: BehaviorSubject<Note> = new BehaviorSubject<Note>(null);
  public notesList: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(null);

  constructor() { }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  saveNote(noteContent: Note) {
    this.setNote(noteContent);
  }

  deleteNote(id: string) {
    let notes: Note[] = (this.getNotes()) as Note[] || []

    if (notes && notes.length != 0) {
      for (let i = 0; i < notes.length; i++) {
        if (notes[i].id === id) {
          delete notes[i]
        }
      }
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  getNotes() {
    let noteJSON = localStorage.getItem("notes");
    let noteListFromJSON = JSON.parse(noteJSON);
    this.notesList.next(noteListFromJSON)
    return noteListFromJSON;
  }

  setNote(note: Note) {
    if (note) {
      console.log(note)
      let freshNote: boolean = true;
      let notes: Note[] = (this.getNotes()) as Note[] || []

      if (notes && notes.length != 0) {
        for (let i = 0; i < notes.length; i++) {
          if (notes[i].id === note.id) {
            notes[i] = note;
            freshNote = false;
          }
        }
      }

      if (freshNote) {
        notes.push(note)
      }

      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }


  changeNote(id: string) {
    let notes: Note[] = (this.getNotes()) as Note[]

    this.setNote(this.currentNote.getValue());

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === id) {
        this.currentNote.next(notes[i])
      }
    }
  }


}
