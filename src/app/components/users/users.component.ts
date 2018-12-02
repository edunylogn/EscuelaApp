import { Component, OnInit } from '@angular/core';
import { UserInterface } from 'src/app/models/userInterface';
import { UserService } from 'src/app/services/user.service';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less']
})
export class UsersComponent implements OnInit {

  persons: PersonInterface[];
  users: UserInterface[];
  editState: boolean = false;
  userToEdit: UserInterface;
  constructor(private userService : UserService, private personService : PersonService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users=>{
      this.users = users;
      console.log(this.users);
    });
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons;
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