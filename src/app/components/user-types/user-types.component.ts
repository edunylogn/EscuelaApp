import { Component, OnInit } from '@angular/core';
import { UserTypeInterface } from 'src/app/models/userTypeInterface';
import { UserTypeService } from 'src/app/services/userType.service';

@Component({
  selector: 'app-user-types',
  templateUrl: './user-types.component.html',
  styleUrls: ['./user-types.component.less']
})
export class UserTypesComponent implements OnInit {
  userTypes: UserTypeInterface[];
  editState: boolean = false;
  userTypeToEdit: UserTypeInterface;
  constructor(private userTypeService : UserTypeService) { }

  ngOnInit() {
    this.userTypeService.getUserTypes().subscribe(userTypes=>{
      this.userTypes = userTypes;
      console.log(this.userTypes);
    });
  }

  editUserType(e, userType: UserTypeInterface) {
    e.preventDefault();
    this.editState = true;
    this.userTypeToEdit = userType;
  }
  onUdpdateUserType(userTypeToEdit: UserTypeInterface) {
    this.userTypeService.updateUserType(userTypeToEdit);
    this.clearState();
  }
  deleteUserType(e, userTypeToEdit: UserTypeInterface) {
    this.userTypeService.deleteUserType(userTypeToEdit);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.userTypeToEdit = null;
  }
}
