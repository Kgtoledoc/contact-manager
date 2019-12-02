import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { ContactListComponent } from "./contact-list/contact-list.component";
import { HttpClientModule } from "@angular/common/http";
import { ContactService } from "./contact.service";
import {
  MatTableModule,
  MatButtonModule,
  MatDialogModule
} from "@angular/material";
import { ContactViewDialogComponent } from "./contact-view-dialog/contact-view-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    ContactViewDialogComponent
  ],
  entryComponents: [ContactViewDialogComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule {}
