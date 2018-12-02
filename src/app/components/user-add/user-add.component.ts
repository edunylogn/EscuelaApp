import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../models/userInterface';
import { SectionInterface } from '../../models/sectionInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.less']
})
export class UserAddComponent implements OnInit {

  persons: PersonInterface[];
  user: UserInterface = {
    username: '',
    password: '',
    idPerson: '',
    email: '',
    userType: null,
  }

  sectionOptions: SectionInterface[]

  constructor(private userService: UserService, private personService : PersonService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons;
    });
  }

  onGuardarUser(myForm: NgForm) {
    if (myForm.valid === true) {
      this.userService.addUser(this.user);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}
