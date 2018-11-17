import { Component, OnInit } from '@angular/core';
import { SectionService } from 'src/app/services/section.service';
import { SectionInterface } from 'src/app/models/sectionInterface';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.less']
})
export class SectionsComponent implements OnInit {
  sections: SectionInterface[];
  editState: boolean = false;
  sectionToEdit: SectionInterface;
  constructor(private sectionService : SectionService) { }

  ngOnInit() {
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
      console.log(this.sections);
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

}
