import { Component, OnInit } from "@angular/core";
import { Icontact } from "../icontact";

import { MatTable, MatDialog, MatDialogRef } from "@angular/material";
import { DataSource } from "@angular/cdk/collections";

import { ContactService } from "../contact.service";
import { ContactViewDialogComponent } from "../contact-view-dialog/contact-view-dialog.component";

@Component({
  selector: "app-contact-list",
  templateUrl: "./contact-list.component.html",
  styleUrls: ["./contact-list.component.css"]
})
export class ContactListComponent implements OnInit {
  displayedColumns: string[] = ["name", "phone", "email", "view"];
  dataSource = new ContactDataSource(this.contactService);
  private contacts: Icontact[];
  private contact: Icontact;

  constructor(
    private contactService: ContactService,
    private dialog: MatDialog
  ) {
    this.contactService
      .getData()
      .subscribe(response => (this.contacts = response));
  }

  ngOnInit() {}

  openDialog(id) {
    this.contactService.view(id).subscribe(response => {
      const dialogRef = this.dialog.open(ContactViewDialogComponent, {
        id: "contact-dialog",
        width: "450px",
        data: response
      });
    });
  }
}

export class ContactDataSource extends DataSource<any> {
  constructor(private contactService: ContactService) {
    super();
  }
  connect() {
    return this.contactService.getData();
  }
  disconnect() {}
}
