import { Component, OnInit } from '@angular/core';
import { RelationInterface } from 'src/app/models/relationInterface';
import { RelationService } from 'src/app/services/relationship.service';

@Component({
  selector: 'app-relations',
  templateUrl: './relations.component.html',
  styleUrls: ['./relations.component.less']
})
export class RelationsComponent implements OnInit {
  relations: RelationInterface[];
  editState: boolean = false;
  relationToEdit: RelationInterface;
  constructor(private relationService : RelationService ) { }

  ngOnInit() {
    this.relationService.getRelations().subscribe(relations=>{
      this.relations = relations;
      console.log(this.relations);
    });
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
}
