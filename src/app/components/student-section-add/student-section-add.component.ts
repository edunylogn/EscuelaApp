import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { StudentSectionService } from '../../services/studentSection.service';
import { StudentSectionInterface } from '../../models/studentSectionInterface';

@Component({
  selector: 'app-student-section-add',
  templateUrl: './student-section-add.component.html',
  styleUrls: ['./student-section-add.component.less']
})
export class StudentSectionAddComponent implements OnInit {
  studentSection: StudentSectionInterface = {
    idSection: '',
    idStudent: '',
  }
  constructor(private studentSectionService : StudentSectionService) { }

  ngOnInit() {
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