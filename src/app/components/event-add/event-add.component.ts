import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { startOfDay } from 'date-fns';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../models/eventInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';

@Component({
  selector: 'app-event-add',
  templateUrl: './event-add.component.html',
  styleUrls: ['./event-add.component.less']
})
export class EventAddComponent implements OnInit, OnChanges {

  @Input()
  sectionFilter: string;

  sections: SectionInterface[];
  event: EventInterface = {
    title: '',
    description: '',
    date: '',
    creator: '',
    idSection: ''
  }
  constructor(private eventService: EventService, private sectionService : SectionService) { }

  ngOnInit() {
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
    });
    this.event.idSection = this.sectionFilter;
  }

  ngOnChanges() {
    this.event.idSection = this.sectionFilter;
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
