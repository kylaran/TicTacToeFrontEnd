import { EventEmitter, Injectable } from '@angular/core';
import { CellEnum, MoveGameDto } from '../models/models';
import { GameSrvService } from './gameSrv.service';
import { TelegramService } from './telegram.service';
import { Router } from '@angular/router';

@Injectable()
export class GameService {

  gameInfoUpdated = new EventEmitter();
  
  gameId!: number;
  withBot: boolean = false;
  board: CellEnum[] = [];
  playerSide!: CellEnum;
  activePlayer: CellEnum = CellEnum.Tic;
  turnCount = 0;
  currentDimension!: number;
  currentWinlineLength!: number;

  constructor(
    private gameSrvService: GameSrvService,
    private telegram: TelegramService,
    private router: Router,
  ) {
  }
   
  newGame(dimension: number, winlineLength: number, gameId: number, withBot: boolean){
    this.withBot = withBot;
    this.gameId = gameId;
    this.activePlayer = CellEnum.Tic;
    this.turnCount = 0;
    this.currentDimension = dimension;
    this.currentWinlineLength = winlineLength;
    this.board = this.createBoard();
    this.gameInfoUpdated.emit();
  } 

  onOpponentJoin(playerSide: CellEnum){
    this.playerSide = playerSide;
    this.gameInfoUpdated.emit();
  }

  createBoard(){
    let board = [];
    for(let i = 0; i < this.currentDimension*this.currentDimension; i++){
      board.push(CellEnum.None)
    };
    return board;
  } 

   get getBoard(){
     return this.board;
   }

   set setBoard(board: CellEnum[]){
     this.board = [...board];
   }

   get getActivePlayer(){
    return this.activePlayer;
   }

   get getPlayerSide(){
    return this.playerSide;
   }
   
  changePlayerTurn(value: CellEnum, id: number){  
    this.updateBoard(value, id);
    this.activePlayer = this.activePlayer === CellEnum.Tic ? CellEnum.Tac : CellEnum.Tic;
    this.gameInfoUpdated.emit();
    this.turnCount++;
    if(this.activePlayer !== this.playerSide){
      const data: MoveGameDto = {
        gameId: this.gameId,
        userId: this.telegram.UserData.id,
        numberCell: id,
        cell: value,
        isMoveWin: this.isWinner,
        isDrawGame: this.isGameOver && !this.isWinner,
      };
      if(this.withBot){
        this.gameSrvService.moveBotGame(data).subscribe(res => {});
      }
      else{
        this.gameSrvService.moveInGame(data).subscribe(res => {});
      }
    }
    if(this.isGameOver){
      if(!this.isWinner){
        this.telegram.showAlert('Draw!', () => {});
      }
      else{
        this.telegram.showAlert(this.activePlayer !== this.playerSide ? 'You win!' : 'You lose!', () => {});
      }
    }
   }

  updateBoard(value: CellEnum, id: number){
    this.board[id] = value;
  }

  get isGameOver(): boolean{
    return this.turnCount >= this.currentDimension*this.currentDimension || this.isWinner ? true : false
  }

  get isWinner(): boolean{
    return this.checkIsWin(this.board);
  }

  checkIsWin(board: CellEnum[]): boolean{
    let isWin = false;
    board.forEach((cell, index) => {
      if(this.checkIfCellInWinline(board, index, this.currentDimension, this.currentWinlineLength)){
        isWin = true;
      }
    });
    return isWin;
  }

  checkIfCellInWinline(board: CellEnum[], cellIndex: number, dimension: number, winlineLength: number): boolean{
    if(!board[cellIndex]){
      return false;
    }
    if(this.checkRow(board, cellIndex, dimension, winlineLength) || this.checkCol(board, cellIndex, dimension, winlineLength) || this.checkRightDiag(board, cellIndex, dimension, winlineLength) || this.checkLeftDiag(board, cellIndex, dimension, winlineLength)){
        return true;
    }
    return false;
  }

  checkRow(board: CellEnum[], cellIndex: number, dimension: number, winlineLength: number): boolean{
    for(let i = 1; i < winlineLength; i++){
       if(!board[cellIndex + i] || Math.floor((cellIndex + i) / dimension) !== Math.floor(cellIndex / dimension) || board[cellIndex + i] !== board[cellIndex]){
        return false;
       } 
    }
    return true;
  }

  checkCol(board: CellEnum[], cellIndex: number, dimension: number, winlineLength: number): boolean{
    for(let i = 1; i < winlineLength; i++){
        if(!board[cellIndex + i*dimension] || board[cellIndex + i*dimension] !== board[cellIndex]){
         return false;
        } 
     }
    return true;
  }

  checkRightDiag(board: CellEnum[], cellIndex: number, dimension: number, winlineLength: number): boolean{
    for(let i = 1; i < winlineLength; i++){
        if(!board[cellIndex + i*dimension + i] || Math.floor((cellIndex + i*dimension + i) / dimension) !== Math.floor(cellIndex / dimension) + i || board[cellIndex + i*dimension + i] !== board[cellIndex]){
         return false;
        } 
     }
    return true;
  }

  checkLeftDiag(board: CellEnum[], cellIndex: number, dimension: number, winlineLength: number): boolean{
    for(let i = 1; i < winlineLength; i++){
        if(!board[cellIndex + i*dimension - i] || Math.floor((cellIndex + i*dimension - i) / dimension) !== Math.floor(cellIndex / dimension) + i || board[cellIndex + i*dimension - i] !== board[cellIndex]){
         return false;
        } 
     }
    return true;
  }


}