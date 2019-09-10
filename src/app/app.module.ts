import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoteDisplayComponent } from './components/note-display/note-display.component';
import { SimplebarComponent } from '../../node_modules/jp-simplebar';
import { NoteListItemComponent } from './components/note-list-item/note-list-item.component'
import { MediumEditorModule } from 'angular2-medium-editor'
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { QrDisplayComponent } from './components/qr-display/qr-display.component';
import { MatDialogModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NoteDisplayComponent,
    SimplebarComponent,
    NoteListItemComponent,
    QrDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, MediumEditorModule,
    ZXingScannerModule,
    ContenteditableModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    QRCodeModule,
    MatDialogModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QrDisplayComponent]
})
export class AppModule { }
