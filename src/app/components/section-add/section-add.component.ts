import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SectionService } from '../../services/section.service';
import { SectionInterface } from '../../models/sectionInterface';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.less']
})
export class SectionAddComponent implements OnInit {


  persons: PersonInterface[];
  section: SectionInterface = {
    idSection: '',
    idTeacher: '',
  }
  constructor(private sectionService : SectionService, private personService : PersonService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons.filter(p => p.personType === '2');
    });
  }

  onGuardarSection(myForm: NgForm) {
    if (myForm.valid === true) {
      this.sectionService.addSection(this.section);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}
