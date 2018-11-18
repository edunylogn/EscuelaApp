import { Component, OnInit } from '@angular/core';
import { UserTypeService } from '../../services/userType.service';
import { UserTypeInterface } from '../../models/userTypeInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-user-type-add',
  templateUrl: './user-type-add.component.html',
  styleUrls: ['./user-type-add.component.less']
})
export class UserTypeAddComponent implements OnInit {
  userType: UserTypeInterface = {
    name: '',
  }

  constructor(private userTypeService : UserTypeService) { }

  ngOnInit() {
  }
  onGuardarUserType(myForm: NgForm) {
    if (myForm.valid === true) {
      this.userTypeService.addUserType(this.userType);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}
