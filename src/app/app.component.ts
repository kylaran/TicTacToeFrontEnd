import { Component, OnInit, inject } from '@angular/core';
import { TelegramService } from './services/telegram.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from './services/user.service';
import { GameSrvService } from './services/gameSrv.service';
import { SseService } from './services/event-source.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  constructor(
    public telegram: TelegramService,
    private router: Router,
    private http: HttpClient,
    private userService: UserService,
    private gameSrvService: GameSrvService,
  ) {
  }

  ngOnInit(): void {
    this.initApp();
  }

  initApp(){
    this.telegram.clearMainButton(); 
    this.telegram.clearBackButton();
    this.telegram.ready();
    this.telegram.expand();
    this.telegram.enableConfirmOnClose();
    if(this.telegram.UserData){
      this.userService.userInit(this.telegram.UserData).subscribe(() => {});
    }
  }

  


}
