import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
  inputElement: ElementRef;
  noteText = "";
  public isSidebarVisible: Boolean = true;

  constructor(private element: ElementRef, private renderer: Renderer2, private swUpdate: SwUpdate, private noteService: NoteService) { }

  ngAfterViewInit(): void {

    this.renderer.listen(this.element.nativeElement, 'paste', (event) => {
      navigator['clipboard'].readText().then(clipText => {
        this.noteText = clipText
        console.log(clipText)
      });
    });

  }


  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
    this.noteService.isSideBarVisible.subscribe((val) => {
      if (this.noteService.isMobile()) {
        this.isSidebarVisible = val;
      }
    })
    if (!this.noteService.isMobile()) {
      this.noteService.isSideBarVisible.next(true);
    } else {
      this.noteService.isSideBarVisible.next(false);
    }
  }

}
