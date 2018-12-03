import { Pipe, PipeTransform } from '@angular/core';
import { EventInterface } from '../models/eventInterface';

@Pipe({
  name: 'eventsBySection'
})
export class EventsBySectionPipe implements PipeTransform {

  transform(events: EventInterface[], sectionId: string | number): EventInterface[] {
    return events
      ? events.filter(event => event.idSection === sectionId)
      : [];
  }

}