import { AfterViewInit, Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { TelegramService } from '../../services/telegram.service';
import { BONUS_PERIOD_MINUTES, FirstStepEnum, GameInList, JoinGameDto, ListGamesVm, UserVm } from '../../models/models';
import { UserService } from '../../services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject, interval, mergeMap, takeUntil } from 'rxjs';
import { GameSrvService } from '../../services/gameSrv.service';

@Component({
  selector: 'main-page-app',
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent implements OnInit, AfterViewInit{

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  FirstStepEnum = FirstStepEnum;

  userData!: UserVm;

  private onDestroy$ = new Subject<void>();

  displayedColumns: string[] = ['createrName', 'price', 'sizeTable', 'winSize', 'firstStep'];
  dataSource = new MatTableDataSource<GameInList>([]);

  isShowBonus = false;
  
  constructor(
    public gameService: GameService,
    private router: Router,
    private telegram: TelegramService,
    private userService: UserService,
    private gameSrvService: GameSrvService,
    private zone: NgZone,
  ) { }

  ngOnInit(): void {
    this.telegram.clearBackButton();
    this.telegram.clearMainButton();
    this.updateUserInfo();
    setTimeout(() => this.updateUserInfo(), 1000);
  }

  ngAfterViewInit() {
    interval(2 * 1000).pipe(
      takeUntil(this.onDestroy$), 
      mergeMap(() => this.gameSrvService.getListOpenGames({take: 1000000, skip: 0}))).subscribe(res => {
      this.zone.run(() => {
        this.dataSource.data = res.data;
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  updateUserInfo(){
    this.userService.getUserById(this.telegram?.UserData?.id).subscribe((res: UserVm) => {
      this.userData = res;
      if(!res.lastGiftRecevied){
        this.isShowBonus = true;
      }
      else{
        const dateNow = new Date();
        const giftReceivedDate = new Date(res.lastGiftRecevied);
        const minutesFromBonus = Math.ceil((dateNow.getTime() - giftReceivedDate.getTime())/(1000*60) + giftReceivedDate.getTimezoneOffset());
        if(minutesFromBonus < BONUS_PERIOD_MINUTES){
          this.isShowBonus = false;
        }
        else{
          this.isShowBonus = true;
        }
      }
    });
  } 

  newGameConfig(){
    this.router.navigate(["/game-settings-page"]);
  }

  goToProfile(){
    this.router.navigate(["/profile-page"]);
  }

  getUserName(name: string){
    return name.length < 13 ? name : name.slice(0, 9) + '...';
  }

  joinGame(row: GameInList){
    const data: JoinGameDto = {
      userId: this.telegram.UserData.id,
      gameId: row.id,
    };
    this.gameSrvService.joinGame(data).subscribe(res => {
      this.router.navigate(['/game-page'], {queryParams:{gameId: row.id}});
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

}
