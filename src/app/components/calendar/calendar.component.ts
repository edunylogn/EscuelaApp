import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth,isSameDay, isSameMonth, addHours, addMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

import { EventInterface } from '../../models/eventInterface';
import { EventService } from '../../services/event.service';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';
import { RelationInterface } from 'src/app/models/relationInterface';
import { RelationService } from 'src/app/services/relationship.service';
import { PersonSectionService } from 'src/app/services/personSection.service';
import { PersonSectionInterface } from 'src/app/models/personSectionInterface';
import { AuthService } from '../../services/auth.service';
import { EventsBySectionPipe } from 'src/app/pipes/events-by-section.pipe'

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};

@Component({
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html',
  providers: [ EventsBySectionPipe ]
})

export class CalendarComponent {
  view: CalendarView = CalendarView.Month;
  CalendarView = CalendarView;
  viewDate: Date = new Date();
  clickedDate: Date;

  modalData: {
    action: string;
    event: CalendarEvent;
  };
  sections: SectionInterface[];
  relations: RelationInterface[];
  personSections: PersonSectionInterface[];

  idSectionSelected: string | number;
  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];
  eventsData: EventInterface[];

  activeDayIsOpen: boolean = true;
  
  editState: boolean = false;
  eventToEdit: EventInterface;
  constructor(
    public dialog: MatDialog, 
    private eventService: EventService, 
    private sectionService : SectionService, 
    private personSectionService : PersonSectionService, 
    private relationService : RelationService, 
    private auth: AuthService,
    private pipeEvent: EventsBySectionPipe,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.auth.getUser().subscribe(user=>{
      if (user && user.idPerson && user.userType === '2') {
        this.sectionService.getSections().subscribe(sections=>{
          this.sections = sections.filter(s => s.idTeacher === user.idPerson);
          this.idSectionSelected = this.sections[0].id;
          this.eventService.getEvents().subscribe(events => {
            this.eventsData = events;
            this.filterBySection(this.idSectionSelected);
          });
        });
      } else if(user && user.idPerson && user.userType === '3') {
        this.relationService.getRelations().subscribe(relations => {
          this.relations = relations.filter(r => r.parentIdentity === user.idPerson);
          this.personSectionService.getStudentSections().subscribe(personSections => {
            const students = relations.map(r => r.studentIdentity);
            this.personSections = personSections.filter(ps => students.includes(ps.idStudent));
            this.sectionService.getSections().subscribe(sections=>{
              const parentSections = personSections.map(ps => ps.idSection);
              this.sections = sections.filter(s => parentSections.includes(String(s.id)));
              this.idSectionSelected = this.sections[0].id;
              this.eventService.getEvents().subscribe(events => {
                this.eventsData = events;
                this.filterBySection(this.idSectionSelected);
                this.cd.markForCheck();
              });
            });
          });
        });
      }
    });
  }

  filterBySection(idSection) {
    this.idSectionSelected = idSection;
    const _events = this.pipeEvent.transform(this.eventsData, this.idSectionSelected);
    this.events = _events.map((event: EventInterface) => {
        return {
          id: event.id,
          start: addMinutes(new Date(event.date), new Date(event.date).getTimezoneOffset()),
          title: event.title,
        };
      });
  }

  /////////

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd
  }: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;
    // this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    const ev = this.eventsData.find(e => e.id === event.id);
    this.dialog.open(CalendarEventModalComponent, { data: ev });
  }

  addEvent(): void {
    this.events.push({
      title: 'New event',
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
      color: colors.red,
      draggable: true,
      resizable: {
        beforeStart: true,
        afterEnd: true
      }
    });
    this.refresh.next();
  }

  getSectionName(id: Number) {
    if (this.sections) {
      const section = this.sections.find(p => p.id === id);
      return section ? section.idSection : id;
    }
  }
}


@Component({
  selector: 'calendar-event-modal',
  templateUrl: 'calendar-event-modal.html',
})

export class CalendarEventModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CalendarEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventInterface
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}