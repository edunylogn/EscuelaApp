import { Component, OnInit } from '@angular/core';
import { PersonInterface } from '../../models/personInterface';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'app-persons',
  templateUrl: './persons.component.html',
  styleUrls: ['./persons.component.less']
})
export class PersonsComponent implements OnInit {
  persons : PersonInterface[];
  editState: boolean = false;
  cursorEdit: PersonInterface;
  constructor(private PersonService : PersonService) { }

  ngOnInit() {
    this.PersonService.getPersons().subscribe(person=>{
      this.persons = person;
      console.log(this.persons);
    });
  }
}
