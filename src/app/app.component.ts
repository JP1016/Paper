import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notes';
  inputElement: ElementRef;
  noteText = "";

  constructor(private element: ElementRef, private renderer: Renderer2) { }

  ngAfterViewInit(): void {

    this.renderer.listen(this.element.nativeElement, 'paste', (event) => {
      navigator['clipboard'].readText().then(clipText => {
        this.noteText = clipText
        console.log(clipText)
      });
    });

  }
}
