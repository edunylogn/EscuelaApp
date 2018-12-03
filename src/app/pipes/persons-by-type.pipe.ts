import { Pipe, PipeTransform } from '@angular/core';
import { PersonInterface } from '../models/personInterface';

@Pipe({
  name: 'personsByType'
})
export class PersonsByTypePipe implements PipeTransform {

  transform(persons: PersonInterface[], type: string | number): PersonInterface[] {
    return persons 
      ? persons.filter(person => person.personType === type)
      : [];
  }

}