import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.less']
})
export class SectionsComponent implements OnInit {
  sections: SectionInterface[];
  persons: PersonInterface[];
  editState: boolean = false;
  sectionToEdit: SectionInterface;
  constructor(private sectionService : SectionService, private personService : PersonService) { }

  ngOnInit() {
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
    }); 
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons.filter(p => p.personType === 2);
    });
  }

  editSection(e, section: SectionInterface) {
    e.preventDefault();
    this.editState = true;
    this.sectionToEdit = section;
  }
  onUdpdateSection(sectionToEdit: SectionInterface) {
    this.sectionService.updateSection(this.sectionToEdit);
    this.clearState();
  }
  deleteSection(e, sectionToEdit: SectionInterface) {
    this.sectionService.deleteSection(sectionToEdit);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.sectionToEdit = null;
  }

  getPersonName(id: Number) {
    if (this.persons) {
      const person = this.persons.find(p => p.id === id);
      return person ? person.name : id;
    }
  }
}
