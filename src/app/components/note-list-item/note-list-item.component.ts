import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note.model';
import { FormattedNote } from 'src/app/models/formatted-note.model';

@Component({
  selector: 'app-note-list-item',
  templateUrl: './note-list-item.component.html',
  styleUrls: ['./note-list-item.component.css']
})
export class NoteListItemComponent implements OnInit {

  formattedNotes: FormattedNote[] = [];
  constructor(private noteService: NoteService) { }

  ngOnInit() {
    this.noteService.getNotes();
    this.noteService.notesList.subscribe(noteList => {
      console.log("Notes List")
      console.log(noteList)
      this.splitOnLineBreak(noteList);
    })
  }

  splitOnLineBreak(notes: Note[]) {
    this.formattedNotes = []
    const removeTags = (item) => item.replace(/<(.|\n)*?>/g, '');

    notes && notes.map(note => {
      const noteLines = note.text.split("<div>");
      const [firstLine, remainingLines] = noteLines;
      const individualNote: FormattedNote = {
        firstLine: firstLine ? removeTags(firstLine) : null,
        nextLines: remainingLines ? removeTags(remainingLines) : null,
        id: note.id
      }
      this.formattedNotes.push(individualNote);
    })
  }

  changeNote(id: string) {
    console.log(id)
    this.noteService.changeNote(id);

  }

}
