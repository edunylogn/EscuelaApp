import { Component, OnInit } from '@angular/core';
import { StudentSectionService } from 'src/app/services/studentSection.service';
import { StudentSectionInterface } from 'src/app/models/studentSectionInterface';

@Component({
  selector: 'app-student-sections',
  templateUrl: './student-sections.component.html',
  styleUrls: ['./student-sections.component.less']
})
export class StudentSectionsComponent implements OnInit {
  studentSections: StudentSectionInterface[];
  editState: boolean = false;
  studentSectionToEdit: StudentSectionInterface;
  constructor(private studentSectionService : StudentSectionService) { }

  ngOnInit() {
    this.studentSectionService.getStudentSections().subscribe(studentSections=>{
      this.studentSections = studentSections;
      console.log(this.studentSections);
    });
  }

  editSection(e, studentSection: StudentSectionInterface) {
    e.preventDefault();
    this.editState = true;
    this.studentSectionToEdit = studentSection;
  }
  onUdpdateStudentSection(studentSectionToEdit: StudentSectionInterface) {
    this.studentSectionService.updateStudentSection(this.studentSectionToEdit);
    this.clearState();
  }
  deleteStudentSection(e, studentSectionToEdit: StudentSectionInterface) {
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
