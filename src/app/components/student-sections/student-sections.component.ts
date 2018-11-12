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
  cursoToEdit: StudentSectionInterface;
  constructor(private studentSectionService : StudentSectionService) { }

  ngOnInit() {
    this.studentSectionService.getStudentSections().subscribe(studentSections=>{
      this.studentSections = studentSections;
      console.log(this.studentSections);
    });
  }

}
