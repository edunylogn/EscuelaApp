import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms/src/directives/ng_form';
import { SectionService } from '../../services/section.service';
import { SectionInterface } from '../../models/sectionInterface';

@Component({
  selector: 'app-section-add',
  templateUrl: './section-add.component.html',
  styleUrls: ['./section-add.component.less']
})
export class SectionAddComponent implements OnInit {

  section: SectionInterface = {
    idsection: '',
    idTeacher: '',
  }
  constructor(private sectionService : SectionService) { }

  ngOnInit() {
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
