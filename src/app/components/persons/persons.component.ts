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
  personToEdit: PersonInterface;
  constructor(private personService : PersonService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons;
      console.log(this.persons);
    });
  }

  editPerson(e, person: PersonInterface) {
    e.preventDefault();
    this.editState = true;
    this.personToEdit = person;
  }
  onUdpdatePerson(person: PersonInterface) {
    this.personService.updatePerson(person);
    this.clearState();
  }
  deletePerson(e, person: PersonInterface) {
    this.personService.deletePerson(person);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.personToEdit = null;
  }
}
