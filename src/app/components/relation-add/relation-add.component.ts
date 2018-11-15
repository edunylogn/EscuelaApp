import { Component, OnInit } from '@angular/core';
import { RelationService } from '../../services/relationship.service';
import { RelationInterface } from '../../models/relationInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-relation-add',
  templateUrl: './relation-add.component.html',
  styleUrls: ['./relation-add.component.less']
})
export class RelationAddComponent implements OnInit {

  relation: RelationInterface = {
    studentIdentity: '',
    parentIdentity: '',
    relationship: null,
  }
  constructor(private relationService: RelationService) { }

  ngOnInit() {
  }

  onGuardarRelation(myForm: NgForm) {
    if (myForm.valid === true) {
      this.relationService.addRelation(this.relation);
      myForm.resetForm();
    } else {
      console.log('Algo va mal');
    }
  }

}
