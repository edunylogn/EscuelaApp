import { Component, OnInit } from '@angular/core';
import { PersonSectionService } from 'src/app/services/personSection.service';
import { PersonSectionInterface } from 'src/app/models/personSectionInterface';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-student-sections',
  templateUrl: './student-sections.component.html',
  styleUrls: ['./student-sections.component.less']
})
export class StudentSectionsComponent implements OnInit {
  studentSections: PersonSectionInterface[];
  persons: PersonInterface[];
  sections: SectionInterface[];
  editState: boolean = false;
  studentSectionToEdit: PersonSectionInterface;
  constructor(private studentSectionService : PersonSectionService, private sectionService : SectionService, private personService : PersonService) { }

  ngOnInit() {
    this.studentSectionService.getStudentSections().subscribe(studentSections=>{
      this.studentSections = studentSections;
      console.log(this.studentSections);
    });
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons.filter(p => p.personType === '4');
    });
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
    });
  }

  editStudentSection(e, studentSection: PersonSectionInterface) {
    e.preventDefault();
    this.editState = true;
    this.studentSectionToEdit = studentSection;
  }
  onUdpdateStudentSection(studentSectionToEdit: PersonSectionInterface) {
    this.studentSectionService.updateStudentSection(this.studentSectionToEdit);
    this.clearState();
  }
  deleteStudentSection(e, studentSectionToEdit: PersonSectionInterface) {
    this.studentSectionService.deleteStudentSection(studentSectionToEdit);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.studentSectionToEdit = null;
  }

  getPersonName(id: Number) {
    if (this.persons) {
      const person = this.persons.find(p => p.id === id);
      return person ? person.name : id;
    }
  }

  getSectionName(id: Number) {
    if (this.sections) {
      const section = this.sections.find(p => p.id === id);
      return section ? section.idSection : id;
    }
  }
}
