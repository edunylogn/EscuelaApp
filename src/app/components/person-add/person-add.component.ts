import { Component, OnInit, Input } from '@angular/core';
import { PersonService } from '../../services/person.service';
import { PersonInterface } from '../../models/personInterface';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../models/userInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { Router } from '@angular/router';

@Component({
  selector: 'app-person-add',
  templateUrl: './person-add.component.html',
  styleUrls: ['./person-add.component.less']
})
export class PersonAddComponent implements OnInit {

  @Input()
  user: UserInterface;

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
  constructor(private personService: PersonService, private userService: UserService, private router: Router) { }

  ngOnInit() {
    if (this.user) {
      this.person.name = this.user.username;
      this.person.personType = this.user.userType;
      this.person.email = this.user.email;
    } 
  }

  onGuardarPerson(myForm: NgForm) {
    if (myForm.valid === true) {
      // if (this.userType) {
      //   this.person.personType = parseInt(this.userType);
      // }
      this.personService.addPerson(this.person).then(newP => { 
        myForm.resetForm();
        if (this.user.id) {
          this.user.idPerson = newP.id;
          this.userService.updateUser(this.user);
        }
      });
    } else {
      console.log('Algo va mal');
    }
  }

}
