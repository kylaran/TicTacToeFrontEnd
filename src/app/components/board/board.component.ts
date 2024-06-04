import { Component, Input } from '@angular/core';
import { GameService } from '../../services/game.service';
import { CellEnum } from '../../models/models';

@Component({
  selector: 'board-app',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  CellEnum = CellEnum;

  constructor(public gameService: GameService ) { }


}
