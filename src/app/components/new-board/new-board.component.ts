import { Component, Input, NgZone, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CellEnum } from '../../models/models';
@Component({
  selector: 'new-board-app',
  templateUrl: './new-board.component.html',
  styleUrl: './new-board.component.scss'
})
export class NewBoardComponent implements OnInit{
  CellEnum = CellEnum;
  math = Math;

  board: CellEnum[] = [];
  activePlayer!: CellEnum;
  playerSide!: CellEnum;
  currentDimension = 0;

  constructor(
    public gameService: GameService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.gameService.gameInfoUpdated.subscribe(res => {
      this.zone.run(() => {
        this.board = this.gameService.getBoard;
        this.activePlayer = this.gameService.activePlayer;
        this.playerSide = this.gameService.playerSide;
        this.currentDimension = this.gameService.currentDimension;
      });
    });
  }

  makeMove(cell: CellEnum, index: number){ 
    if (cell === CellEnum.None && this.activePlayer === this.playerSide){
      this.gameService.changePlayerTurn(this.playerSide, index);
    }
  }
  
  getSymbol(cell: CellEnum): string {
    switch (cell) {
      case CellEnum.Tic:
        return 'X';
      case CellEnum.Tac:
        return 'O';
      default:
        return '';
    }
  }
}
