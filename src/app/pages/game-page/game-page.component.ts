import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { TelegramService } from '../../services/telegram.service';
import { ActivatedRoute, Router } from '@angular/router';
import { GameSrvService } from '../../services/gameSrv.service';
import { CellEnum, FinishGameDto, FirstStepEnum, GameVm, SSEStatusEnum, SSEVm, StatusGameEnum } from '../../models/models';
import { firstValueFrom } from 'rxjs';
import { SseService } from '../../services/event-source.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'game-page-app',
  templateUrl: './game-page.component.html',
  styleUrl: './game-page.component.scss'
})
export class GamePageComponent implements OnInit {

  gameId!: number;

  gameInfo!: GameVm;

  board!: CellEnum[];
  activePlayer!: CellEnum;
  playerSide!: CellEnum;
  isGameOver!: boolean;
  isWinner!: boolean;

  isGiveUp = false;

  StatusGameEnum = StatusGameEnum;

  opponentAvatar!: any;
  opponentName!: string | undefined;

  constructor(
    public gameService: GameService,
    private router: Router,
    private route: ActivatedRoute,
    private telegram: TelegramService,
    private gameSrvService: GameSrvService,
    private sseService: SseService,
    private zone: NgZone,
    private sanitizer: DomSanitizer,
   ) { 
   }

  async ngOnInit() {
    this.gameService.gameInfoUpdated.subscribe(res => {
      this.zone.run(() => {
        this.board = this.gameService.getBoard;
        this.activePlayer = this.gameService.activePlayer;
        this.playerSide = this.gameService.playerSide;
        this.isGameOver = this.gameService.isGameOver;
        this.isWinner = this.gameService.isWinner;
       });
    });

    this.telegram.clearBackButton();
    this.telegram.clearMainButton(); 
    this.gameId = +(this.route.snapshot.queryParams['gameId'] ?? 0);
    const response = await firstValueFrom(this.gameSrvService.getGameById(this.gameId));
    this.gameInfo = response;
    this.setOpponentNameAndAvatar();
    this.gameService.newGame(this.gameInfo.table.wallSize, this.gameInfo.table.winSize, this.gameId, this.gameInfo.withBot);
    if(this.gameInfo.participantJoined){
      if(this.gameInfo.firstStep === FirstStepEnum.Creater){
        this.gameService.onOpponentJoin(this.telegram.UserData.id === this.gameInfo.participantCreater.userId ? CellEnum.Tic : CellEnum.Tac);
      }
      else if(this.gameInfo.firstStep === FirstStepEnum.Joiner){
        this.gameService.onOpponentJoin(this.telegram.UserData.id === this.gameInfo.participantJoined.userId ? CellEnum.Tic : CellEnum.Tac);
      }
    }
    this.readSSE();
  }

  updateGameInfo(){
    this.gameSrvService.getGameById(this.gameId).subscribe(res => {
      this.zone.run(() => { 
        this.gameInfo = res;
        this.setOpponentNameAndAvatar();
      });
    });
  }

  setOpponentNameAndAvatar(){
    if(this.telegram.UserData.id === this.gameInfo.participantCreater.userId){
      if(this.gameInfo.participantJoined?.photo_url){
        this.opponentAvatar = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.gameInfo.participantJoined?.photo_url);
      }
    }
    else{
      if(this.gameInfo.participantCreater?.photo_url){
        this.opponentAvatar = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.gameInfo.participantCreater?.photo_url);
      }
    }
    this.opponentName = this.telegram.UserData.id === this.gameInfo.participantCreater.userId ? this.gameInfo.participantJoined?.first_name : this.gameInfo.participantCreater?.first_name;
  }

  readSSE(){
    this.sseService.getServerSentEvents(this.gameId, this.telegram.UserData.id).subscribe((res) => {
       console.log('Received SSE:', res);
       const result: SSEVm = JSON.parse(res);
       switch(result.status){
        case SSEStatusEnum.Nothing:
          break;
        case SSEStatusEnum.Joined:
          this.updateGameInfo();
          this.gameService.onOpponentJoin(result.data as CellEnum);
          break;
        case SSEStatusEnum.Move:
          this.gameService.changePlayerTurn(this.activePlayer, result.data);
          break;
        case SSEStatusEnum.Over:
          switch(result.data.statusGame){
            case StatusGameEnum.GameOver:
              this.gameService.changePlayerTurn(this.activePlayer, result.data.lastMove);
              break;
            case StatusGameEnum.GameFailed:
              this.telegram.showAlert('Opponent lose by timer!', () => {});
              this.isGiveUp = true;
              break;
            case StatusGameEnum.GameOverDraw:
              this.gameService.changePlayerTurn(this.activePlayer, result.data.lastMove);
              break;
            case StatusGameEnum.GameOverGaveUp:
              this.telegram.showAlert('Opponent gave up!', () => {});
              this.isGiveUp = true;
              break;        
          }
          break;
       }
     });
   }

   giveUp(){
     this.telegram.showConfirm('Are you sure you want to give up?', value => this.giveUpConfirmed(value));
   }

   giveUpConfirmed(isConfirmed?: boolean){
    if(isConfirmed){
      const data: FinishGameDto = {
        userId: this.telegram.UserData.id,
        gameId: this.gameId,
      };
      this.gameSrvService.giveUpInGame(data).subscribe(res => {
        this.goToMain();
      });
    }
   }

   quitGame(){
    this.telegram.showConfirm('Are you sure you want to quit game?', value => this.quitGameConfirmed(value));
   }

   quitGameConfirmed(isConfirmed?: boolean){
    if(isConfirmed){
      this.gameSrvService.quitGame(this.gameId).subscribe(() => {
        this.goToMain();
      });
    }
   }

   goToMain(){
    this.router.navigate(['/']);
   }

}
