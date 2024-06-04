import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TelegramService } from '../../services/telegram.service';
import { AddBalanceDto, BONUS_PERIOD_MINUTES, DEFAULT_BONUS, GameHistory, START_BONUS, StatusGameEnum, UserVm } from '../../models/models';
import { UserService } from '../../services/user.service';
import { ProfileInfoComponent } from '../../components/profile-info/profile-info.component';
import {Location} from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'profile-page-app',
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(ProfileInfoComponent) profileInfo!: ProfileInfoComponent;

  bonus = DEFAULT_BONUS;

  displayedColumns: string[] = ['opponentName', 'gameResult', 'financialMovment', 'finishedDate'];
  dataSource = new MatTableDataSource<GameHistory>([]);

  betAmount = new FormControl(null, [Validators.required, Validators.min(10), Validators.max(150)]);

  userData!: UserVm;

  isLoading = false;

  minutesToBonus = 0;

  constructor(
    public gameService: GameService,
    private router: Router,
    private telegram: TelegramService,
    private userService: UserService,
    private _location: Location,
  ) { }

  ngOnInit(): void {
    this.telegram.setupBackButton(() => this.goToMain());
    this.telegram.clearMainButton();
    this.userService.getHistory({take: 1000000, skip: 0, userId: this.telegram.UserData.id}).subscribe(res => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
    });
    this.updateProfile();
  }

  updateProfile(){
    this.userService.getUserById(this.telegram.UserData.id).subscribe(res => {
      this.userData = res;
      if(!this.userData.lastGiftRecevied){
        this.bonus = START_BONUS;
      }
      else{
        this.bonus = DEFAULT_BONUS;
        const dateNow = new Date();
        const giftReceivedDate = new Date(this.userData.lastGiftRecevied);
        const minutesFromBonus = Math.ceil((dateNow.getTime() - giftReceivedDate.getTime())/(1000*60) + giftReceivedDate.getTimezoneOffset());
        if(minutesFromBonus < BONUS_PERIOD_MINUTES){
          this.minutesToBonus = BONUS_PERIOD_MINUTES - minutesFromBonus;
        }
        else{
          this.minutesToBonus = 0;
        }
      }
    });
  }

  newGameConfig(){
    this.router.navigate(["/game-settings-page"]);
  }

  goToMain(){
    this._location.back();
  }

  getReward(){
    const data: AddBalanceDto = {
      userId: this.telegram.UserData.id,
      freeCoin: this.bonus,
    }
    this.isLoading = true;
    this.userService.addFreeCoin(data).subscribe(() => {
      this.updateProfile();
      this.isLoading = false;
    }, err => {
      this.isLoading = false;
    });
  }

  getGameResult(element: GameHistory){
    switch(element.statusGame){
      case StatusGameEnum.GameOver:
      case StatusGameEnum.GameFailed:
      case StatusGameEnum.GameOverGaveUp:
        return element.isWin ? 'Win' : 'Lose';
      case StatusGameEnum.GameOverDraw:
        return 'Draw';
      default:
        return '';    
    }
  }

}
