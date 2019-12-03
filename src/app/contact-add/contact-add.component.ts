import { Component, OnInit } from "@angular/core";
import { ContactService } from "../contact.service";
import { MatDialogRef, MatDialog, MatSnackBar } from "@angular/material";

@Component({
  selector: "app-contact-add",
  templateUrl: "./contact-add.component.html",
  styleUrls: ["./contact-add.component.css"]
})
export class ContactAddComponent implements OnInit {
  data = {};
  constructor(
    private dialogRef: MatDialogRef<ContactAddComponent>,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  save(contact) {
    this.contactService.add(contact).subscribe(response => {
      if (response["ok"]) {
        this.notify(`${contact.name} added to your contact list`);
        this.close();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  notify(message) {
    this.snackBar.open(message, "OK", { duration: 4000 });
  }
}
