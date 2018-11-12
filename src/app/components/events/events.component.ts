import { Component, OnInit } from '@angular/core';
import { EventInterface } from '../../models/eventInterface';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {
  events: EventInterface[];
  editState: boolean = false;
  eventToEdit: EventInterface;
  constructor(private eventService: EventService) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe(events => {
      this.events = events;
      console.log(this.events);
    });
  }

  editEvent(e, event: EventInterface) {
    e.preventDefault();
    this.editState = true;
    this.eventToEdit = event;
  }
  onUdpdateEvent(event: EventInterface) {
    this.eventService.updateEvent(event);
    this.clearState();
  }
  deleteEvent(e, event: EventInterface) {
    this.eventService.deleteEvent(event);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.eventToEdit = null;
  }
}
