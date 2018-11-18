import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInterface } from '../../models/userInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.less']
})
export class UserAddComponent implements OnInit {

  user: UserInterface = {
    username: '',
    password: '',
    idPerson: '',
    email: '',
    userType: null,
  }

  constructor(private userService: UserService) { }

  ngOnInit() {
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
