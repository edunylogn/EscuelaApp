import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/userInterface';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  users: UserInterface[];
  editState: boolean = false;
  userToEdit: UserInterface;
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users=>{
    this.users = users;
    console.log(this.users);
    });
  }

  editUser(e, user: UserInterface) {
    e.preventDefault();
    this.editState = true;
    this.userToEdit = user;
  }
  onUdpdateUser(userToEdit: UserInterface) {
    this.userService.updateUser(userToEdit);
    this.clearState();
  }
  deleteUser(e, userToEdit: UserInterface) {
    this.userService.deleteUser(userToEdit);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.userToEdit = null;
  }
}