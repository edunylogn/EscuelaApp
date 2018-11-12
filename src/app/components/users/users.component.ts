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
  cursoToEdit: UserInterface;
  constructor(private userService : UserService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(users=>{
    this.users = users;
    console.log(this.users);
    });
  }

}
