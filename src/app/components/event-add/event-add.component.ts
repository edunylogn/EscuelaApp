import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../models/eventInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.less']
})
export class EventAddComponent implements OnInit {

  event: EventInterface = {
    title: '',
    description: '',
    location: '',
    category: null,
    date: ''
  }
  constructor(private eventService: EventService) { }

  ngOnInit() {
  }

  onGuardarEvent(myForm: NgForm) {
    if (myForm.valid === true) {
      this.eventService.addEvent(this.event);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}
