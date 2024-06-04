import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TelegramService } from '../../services/telegram.service';
import { GameSrvService } from '../../services/gameSrv.service';
import { BalanceVm, CreateGameDto, FirstStepEnum } from '../../models/models';
import {Location} from '@angular/common';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'game-settings-page-app',
  templateUrl: './game-settings-page.component.html',
  styleUrl: './game-settings-page.component.scss'
})
export class GameSettingsPageComponent implements OnInit{

  betAmount = new FormControl<number | null>(10, [Validators.required, Validators.min(10)]);
  boardDimension = new FormControl<number | null>(3, [Validators.required, Validators.min(3), Validators.max(15)]);
  winlineLength = new FormControl<number | null>(3, [Validators.required, Validators.min(3), Validators.max(6)]);
  moveTime = new FormControl<number | null>(10, [Validators.required, Validators.min(10), Validators.max(180)]);
  isPrivate = new FormControl<boolean>(false);
  isWithBot = new FormControl<boolean>(false);
  firstStep = new FormControl<FirstStepEnum>(FirstStepEnum.Random);

  FirstStepEnum = FirstStepEnum;

  userBalance!: BalanceVm;

  constructor(
    public gameService: GameService,
    private router: Router,
    private telegram: TelegramService,
    private gameSrvService: GameSrvService,
    private _location: Location,
    private userService: UserService,
   ) { }


   ngOnInit(): void {
    this.telegram.clearMainButton();
    this.telegram.setupBackButton(() => this.goToMain());

    this.userService.getBalance(this.telegram.UserData.id).subscribe(res => {
      this.userBalance = res;
    });

    this.isWithBot.valueChanges.subscribe(value => {
      if(value){
        this.moveTime.setValue(null);
        this.moveTime.disable({emitEvent: false});
        this.betAmount.setValue(null);
        this.betAmount.disable({emitEvent: false});
        this.isPrivate.setValue(false, {emitEvent: false});
        this.isPrivate.disable({emitEvent: false});
      }
      else{
        this.moveTime.enable({emitEvent: false});
        this.betAmount.enable({emitEvent: false});
        this.isPrivate.enable({emitEvent: false});
      }
    });

    this.isPrivate.valueChanges.subscribe(value => {
      if(value){
        this.isWithBot.setValue(false, {emitEvent: false});
        this.isWithBot.disable({emitEvent: false});
      }
      else{
        this.isWithBot.enable({emitEvent: false});
      }
    });

    this.betAmount.valueChanges.subscribe(value => {
      if(value && value > this.userBalance.freeCoin){
        this.betAmount.setValue(this.userBalance.freeCoin, {emitEvent: false})
      }
    });

    this.winlineLength.valueChanges.subscribe(value => {
      if(value && this.boardDimension.value && value > this.boardDimension.value){
        this.boardDimension.setValue(value, {emitEvent: false});
      }
    });

    this.boardDimension.valueChanges.subscribe(value => {
      if(value && this.winlineLength.value && value < this.winlineLength.value){
        this.winlineLength.setValue(value, {emitEvent: false});
      }
    });

   }

  onSubmit(){
    this.betAmount.markAsTouched();
    this.boardDimension.markAsTouched();
    this.winlineLength.markAsTouched();
    this.moveTime.markAsTouched();
    if(this.betAmount.invalid || this.boardDimension.invalid || this.winlineLength.invalid || this.moveTime.invalid){
      return;
    }

    const data: CreateGameDto = {
      userId: this.telegram.UserData.id,
      isFreeGame: true,
      isPrivateGame: !!this.isPrivate.value,
      withBot: !!this.isWithBot.value,
      wallSize: this.boardDimension.value ?? 3,
      winSize: this.winlineLength.value ?? 3,
      moveTime: this.moveTime.value ?? 10,
      price: this.betAmount.value ?? 10,
      firstStep: this.firstStep.value ?? FirstStepEnum.Random,
    };
    this.gameSrvService.createGame(data).subscribe(res => {
      this.router.navigate(['/game-page'], {queryParams:{gameId: res.id}});
    });
  }

  goToMain(){
    this._location.back();
  }

}
