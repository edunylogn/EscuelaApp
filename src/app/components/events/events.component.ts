import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { EventInterface } from '../../models/eventInterface';
import { EventService } from '../../services/event.service';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.less']
})
export class EventsComponent implements OnInit {
  events: EventInterface[];
  sections: SectionInterface[];
  editState: boolean = false;
  prevLength: Number = 0;
  eventToEdit: EventInterface;
  constructor(private eventService: EventService, private sectionService : SectionService, private cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
      this.eventService.getEvents().subscribe(events => {
        this.events = events;
        this.cd.markForCheck();
        console.log(this.events);
      });
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

  getSectionName(id: Number) {
    if (this.sections) {
      const section = this.sections.find(p => p.id === id);
      return section ? section.idSection : id;
    }
  }
}
