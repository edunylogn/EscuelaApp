import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { PersonSectionService } from '../../services/personSection.service';
import { PersonSectionInterface } from '../../models/personSectionInterface';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-student-section-add',
  templateUrl: './student-section-add.component.html',
  styleUrls: ['./student-section-add.component.less']
})
export class StudentSectionAddComponent implements OnInit {
  persons: PersonInterface[];
  sections: SectionInterface[];
  studentSection: PersonSectionInterface = {
    idSection: '',
    idStudent: '',
  }
  constructor(private studentSectionService : PersonSectionService, private sectionService : SectionService, private personService : PersonService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons.filter(p => p.personType === '4');
    });
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
    });
  }

  onGuardarStudentSection(myForm: NgForm) {
    if (myForm.valid === true) {
      this.studentSectionService.addStudentSection(this.studentSection);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}