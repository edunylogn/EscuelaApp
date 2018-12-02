import { Component, OnInit } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonInterface } from '../../models/personInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.less']
})
export class PersonAddComponent implements OnInit {

  person: PersonInterface = {
    name: '',
    identification: '',
    gender: null,
    address: '',
    birthday: '',
    email: '',
    phone: null,
    personType: null
  }
  constructor(private personService: PersonService) { }

  ngOnInit() {
  }

  onGuardarPerson(myForm: NgForm) {
    if (myForm.valid === true) {
      this.personService.addPerson(this.person);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}
