import { Component, OnInit } from '@angular/core';
import { Icontact } from '../icontact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  private contacts: Icontact[];

  constructor() {
    this.contacts = [{
      'name': 'Kevin Toledo',
      'email': 'kgtoledoc@unal.edu.co',
      'phone': '+573016308772',
      'address': 'Calle 52 # 9 - 38',
    },
    {
      'name': 'Isamar Montañez',
      'email': 'isamar_montañez@unal.edu.co',
      'phone': '+573016308772',
      'address': 'Calle 52 # 9 - 38',
    }
    ]
  }


  ngOnInit() {
  }

}
