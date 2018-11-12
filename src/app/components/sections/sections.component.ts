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
  cursoToEdit: SectionInterface;
  constructor(private sectionService : SectionService) { }

  ngOnInit() {
    this.sectionService.getSections().subscribe(sections=>{
      this.sections=sections;
      console.log(this.sections);
    });
  }

}
