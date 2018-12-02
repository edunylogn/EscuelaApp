import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { startOfDay, endOfDay, subDays, addDays, endOfMonth,isSameDay, isSameMonth, addHours, addMinutes } from 'date-fns';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CalendarEvent, CalendarEventAction, CalendarEventTimesChangedEvent, CalendarView } from 'angular-calendar';

import { EventInterface } from '../../models/eventInterface';
import { EventService } from '../../services/event.service';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';

const colors: any = {
  red: { primary: '#ad2121', secondary: '#FAE3E3' },
  blue: { primary: '#1e90ff', secondary: '#D1E8FF' },
  yellow: { primary: '#e3bc08', secondary: '#FDF1BA' }
};

export interface DialogData {
  animal: 'panda' | 'unicorn' | 'lion';
}

@Component({
  selector: 'calendar-component',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html'
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
  idSectionSelected: string | number;

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fa fa-fw fa-pencil"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      }
    },
    {
      label: '<i class="fa fa-fw fa-times"></i>',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter(iEvent => iEvent !== event);
        this.handleEvent('Deleted', event);
      }
    }
  ];

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;
  
  editState: boolean = false;
  eventToEdit: EventInterface;
  constructor(public dialog: MatDialog, private eventService: EventService, private sectionService : SectionService) {}

  ngOnInit() {
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
      this.idSectionSelected = sections[0].id;

      this.eventService.getEvents().subscribe(events => {
        this.events = events.map((event: EventInterface) => {
            return {
              start: addMinutes(new Date(event.date), new Date(event.date).getTimezoneOffset()),
              title: event.title,
            };
          });
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
    this.handleEvent('Dropped or resized', event);
    this.refresh.next();
  }

  handleEvent(action: string, event: CalendarEvent): void {
    // this.modalData = { event, action };

    this.dialog.open(CalendarEventModalComponent, {
      data: {
        animal: 'panda'
      }
    });
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
}


@Component({
  selector: 'calendar-event-modal',
  templateUrl: 'calendar-event-modal.html',
})

export class CalendarEventModalComponent {

  constructor(
    public dialogRef: MatDialogRef<CalendarEventModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}