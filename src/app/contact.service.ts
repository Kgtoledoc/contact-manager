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

  save(id, data) {
    return this.http.post(`http://localhost:3000/api/contacts/${id}`, data);
  }

  add(contact) {
    return this.http.post("http://localhost:3000/api/contacts", contact);
  }

  delete(id) {
    return this.http.delete(`http://localhost:3000/api/contacts/${id}`);
  }
}
