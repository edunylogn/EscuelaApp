import { Component, OnInit } from '@angular/core';
import { PersonSectionService } from 'src/app/services/personSection.service';
import { PersonSectionInterface } from 'src/app/models/personSectionInterface';

@Component({
  selector: 'app-student-sections',
  templateUrl: './student-sections.component.html',
  styleUrls: ['./student-sections.component.less']
})
export class StudentSectionsComponent implements OnInit {
  studentSections: PersonSectionInterface[];
  editState: boolean = false;
  studentSectionToEdit: PersonSectionInterface;
  constructor(private studentSectionService : PersonSectionService) { }

  ngOnInit() {
    this.studentSectionService.getStudentSections().subscribe(studentSections=>{
      this.studentSections = studentSections;
      console.log(this.studentSections);
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
}
