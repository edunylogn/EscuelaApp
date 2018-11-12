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
  cursoToEdit: RelationInterface;
  constructor(private relationService : RelationService ) { }

  ngOnInit() {
    this.relationService.getRelations().subscribe(relations=>{
      this.relations = relations;
      console.log(this.relations);
    });
  }

}
