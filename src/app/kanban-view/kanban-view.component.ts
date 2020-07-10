import { Component, OnInit } from '@angular/core';
import { error } from 'util';

@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css']
})
export class KanbanViewComponent implements OnInit {
  addValue: string = "";
  selectedCard: string = "";
  stageId: number;
  stages = [{
    id: 1,
    name: 'Backlog',
    cards: [],
  }, {
    id: 2,
    name: 'To Do',
    cards: [],
  }, {
    id: 3,
    name: 'Ongoing',
    cards: [],
  }, {
    id: 4,
    name: 'Done',
    cards: [],
  }];

  constructor() { }

  ngOnInit() {
    this
  }

  onAddCard() {
    console.log(this.addValue);
    this.stages[0].cards.push(this.addValue);
  }

  onCardselect(data) {
    console.log("view oncardselect " + data);
    this.selectedCard = data;
    this.stageId = this.stages.findIndex((stage) => stage.cards.indexOf(this.selectedCard) >= 0);
    console.log(this.stageId);
  }

  onMoveBackCard() {
    if (this.selectedCard == "") {
      return;

    }
    else {
      if (this.stageId > 0) {
        this.stages[this.stageId - 1].cards.push(this.selectedCard);
      }
      else {
        this.stages[this.stages.length - 1].cards.push(this.selectedCard);
      }

      let index = this.stages[this.stageId].cards.indexOf(this.selectedCard);
      this.stages[this.stageId].cards.splice(index, 1);
      this.selectedCard = "";
    }
  }

  onMoveForwardCard() {
    if (this.selectedCard == "") {
      alert("Please Select Card!");
    }
    else {


      if (this.stageId < this.stages.length - 1) {
        this.stages[this.stageId + 1].cards.push(this.selectedCard);
      }
      else {
        this.stages[0].cards.push(this.selectedCard);
      }

      let index = this.stages[this.stageId].cards.indexOf(this.selectedCard);
      this.stages[this.stageId].cards.splice(index, 1);
      this.selectedCard = "";
    }
  }

  onDeleteCard() {
    if (this.selectedCard == "") {
      alert("Please Select Card!");
    }
    else {
      let index = this.stages[this.stageId].cards.indexOf(this.selectedCard);
      this.stages[this.stageId].cards.splice(index, 1);
      this.selectedCard = "";
    }
  }

}
