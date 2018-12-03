import { Component, OnInit } from '@angular/core';
import { PersonInterface } from '../../models/personInterface';
import { PersonService } from '../../services/person.service';

import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserInterface } from 'src/app/models/userInterface';

@Component({
  selector: 'app-persons',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.less']
})
export class MyprofileComponent implements OnInit {
  persons : PersonInterface[];
  editState: boolean = false;
  user: UserInterface;
  addProfile: boolean = false;
  completeProfile: boolean = false;
  personToEdit: PersonInterface;
  constructor(private personService : PersonService, private router: ActivatedRoute, private auth: AuthService) { }

  ngOnInit() {
    
    this.personService.getPersons().subscribe(persons=>{
      this.auth.getUser().subscribe(user=>{
        if (user.idPerson) {
          this.user = user;
          this.persons = persons.filter(p => p.id === user.idPerson);
        }
      });
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
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.personToEdit = null;
  }
}
