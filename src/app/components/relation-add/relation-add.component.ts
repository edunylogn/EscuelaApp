import { Component, OnInit } from '@angular/core';
import { RelationService } from '../../services/relationship.service';
import { RelationInterface } from '../../models/relationInterface';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';
import { NgForm } from '@angular/forms/src/directives/ng_form';

@Component({
  selector: 'app-relation-add',
  templateUrl: './relation-add.component.html',
  styleUrls: ['./relation-add.component.less']
})
export class RelationAddComponent implements OnInit {
  showRelations: string[];
  persons: PersonInterface[];
  relation: RelationInterface = {
    studentIdentity: '',
    parentIdentity: '',
    relationship: '',
  }
  constructor(private relationService: RelationService, private personService : PersonService) { }

  ngOnInit() {
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons;
    });
    this.showRelations = [
      'Padre / Madre',
      'Familiar',
      'Otro'
    ]
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
