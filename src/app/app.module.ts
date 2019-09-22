import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoteDisplayComponent } from './components/note-display/note-display.component';
import { NoteListItemComponent } from './components/note-list-item/note-list-item.component';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ContenteditableModule } from '@ng-stack/contenteditable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QRCodeModule } from 'angularx-qrcode';
import { QrDisplayComponent } from './components/qr-display/qr-display.component';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { IconsModule } from './icons/icons.module';
import { QrReadComponent } from './components/qr-read/qr-read.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NtkmeButtonModule } from '@ctrl/ngx-github-buttons';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NoteDisplayComponent,
    NoteListItemComponent,
    QrDisplayComponent,
    NavbarComponent,
    QrReadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ZXingScannerModule,
    ContenteditableModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    QRCodeModule,
    MatDialogModule,
    IconsModule,
    MatIconModule,
    MatSnackBarModule,
    NtkmeButtonModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, registrationStrategy: 'registerImmediately' })
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [QrDisplayComponent, QrReadComponent]
})
export class AppModule { }
