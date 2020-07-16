import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-kanban-view',
  templateUrl: './kanban-view.component.html',
  styleUrls: ['./kanban-view.component.css']
})
export class KanbanViewComponent implements OnInit {
  addValue: string = "";
  selectedCard: string = "";
  stageId: number;
  disableBack = true;
  disableForward = true;
  disableDelete = true;
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

  }

  onAddCard() {
    //console.log(this.addValue);

    if (this.stages[0].cards.indexOf(this.addValue) >= 0) {
      alert("card already exists");
    }
    else {
      this.stages[0].cards.push(this.addValue);
    }

  }

  onCardselect(data) {
    //console.log("view oncardselect " + data);
    this.selectedCard = data;
    this.stageId = this.stages.findIndex((stage) => stage.cards.indexOf(this.selectedCard) >= 0);
    if (this.selectedCard == "") {
      this.disableBack = true;
      this.disableForward = true;
      this.disableDelete = true;
    }
    else {
      if (this.stageId == 0) {
        this.disableBack = true;
      }
      else {
        this.disableBack = false;
      }
      if (this.stageId == this.stages.length - 1) {
        this.disableForward = true;
      }
      else {
        this.disableForward = false;
      }
      this.disableDelete = false;
    }

    console.log(this.stageId);
  }

  onMoveBackCard() {
    let x = this.stages[this.stageId - 1].cards.push(this.selectedCard);
    let index = this.stages[this.stageId].cards.indexOf(this.selectedCard);
    this.stages[this.stageId].cards.splice(index, 1);
    // this.selectedCard = "";
    if (x != undefined) { this.onCardselect(this.stages[this.stageId - 1].cards[x - 1]); }
  }

  onMoveForwardCard() {
    let x = this.stages[this.stageId + 1].cards.push(this.selectedCard);

    let index = this.stages[this.stageId].cards.indexOf(this.selectedCard);
    this.stages[this.stageId].cards.splice(index, 1);
    //this.selectedCard = "";
    if (x != undefined) { this.onCardselect(this.stages[this.stageId + 1].cards[x - 1]); }

  }

  onDeleteCard() {
    let index = this.stages[this.stageId].cards.indexOf(this.selectedCard);
    this.stages[this.stageId].cards.splice(index, 1);
    this.onCardselect("");
    this.disableDelete = true;

  }

}
