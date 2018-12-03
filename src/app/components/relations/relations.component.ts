import { Component, OnInit } from '@angular/core';
import { RelationInterface } from 'src/app/models/relationInterface';
import { RelationService } from 'src/app/services/relationship.service';
import { PersonService } from 'src/app/services/person.service';
import { PersonInterface } from 'src/app/models/personInterface';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.less']
})
export class RelationsComponent implements OnInit {
  showRelations: string[];
  relations: RelationInterface[];
  persons: PersonInterface[] = [];
  editState: boolean = false;
  relationToEdit: RelationInterface;
  constructor(private relationService : RelationService, private personService : PersonService) { }

  ngOnInit() {
    this.relationService.getRelations().subscribe(relations=>{
      this.relations = relations;
      console.log(this.relations);
    });
    this.personService.getPersons().subscribe(persons=>{
      this.persons = persons;
    });
    this.showRelations = [
      'Padre / Madre',
      'Familiar',
      'Otro'
    ]
  }
  editRelation(e, relation: RelationInterface) {
    e.preventDefault();
    this.editState = true;
    this.relationToEdit = relation;
  }
  onUdpdateRelation(relationToEdit: RelationInterface) {
    this.relationService.updateRelation(relationToEdit);
    this.clearState();
  }
  deleteRelation(e, relationToEdit: RelationInterface) {
    this.relationService.deleteRelation(relationToEdit);
    this.clearState();
  }
  clearState(e = null) {
    if (e)
      e.preventDefault();
    this.editState = false;
    this.relationToEdit = null;
  }

  getPersonName(id: Number) {
    if (this.persons) {
      const person = this.persons.find(p => p.id === id);
      return person ? person.name : id;
    }
  }
}
