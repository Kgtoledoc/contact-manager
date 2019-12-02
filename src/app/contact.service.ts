import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Icontact } from "./icontact";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  public contacts: Icontact[];
  constructor(private http: HttpClient) {}

  getData() {
    return this.http.get<Icontact[]>("http://localhost:3000/api/contacts");
  }

  view(id) {
    return this.http.get<Icontact>(`http://localhost:3000/api/contacts/${id}`);
  }
}
