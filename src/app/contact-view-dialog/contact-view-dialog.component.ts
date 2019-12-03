import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatSnackBar
} from "@angular/material";
import { ContactService } from "../contact.service";
import { ConfirmDialogComponent } from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: "app-contact-view-dialog",
  templateUrl: "./contact-view-dialog.component.html",
  styleUrls: ["./contact-view-dialog.component.css"]
})
export class ContactViewDialogComponent implements OnInit {
  displayed: Boolean = false;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<any>,
    private contactService: ContactService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {}

  displayForm(): Boolean {
    return (this.displayed = true);
  }

  delete(id) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: "450px",
      data: {
        title: "Confirmation dialog",
        message: "Are you sure you want to delete this contact?"
      }
    });

    dialogRef.afterClosed().subscribe(confirmation => {
      if (confirmation) {
        this.contactService.delete(id).subscribe(response => {
          if (response["ok"] === 1) {
            this.notify(`Contact deleted!`);
            this.dialog.getDialogById("contact-dialog").close();
          }
        });
      }
    });
  }

  save(id, data) {
    delete data._id;
    this.contactService.save(id, data).subscribe(response => {
      if (response["ok"] === 1) {
        this.notify(`${data.name} updated.`);
        this.dialog.getDialogById("contact-dialog").close();
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  notify(message) {
    this.snackBar.open(message, "OK", { duration: 40000 });
  }
}
