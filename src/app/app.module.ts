import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameService } from './services/game.service';
import { GamePageModule } from './pages/game-page/game-page.module';
import { MainPageModule } from './pages/main-page/main-page.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { GameSettingsPageModule } from './pages/game-settings-page/game-settings-page.module';
import { ProfilePageModule } from './pages/profile-page/profile-page.module';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardModule } from './components/board/board.module';
import { ProfileInfoModule } from './components/profile-info/profile-info.module';
import { NewBoardModule } from './components/new-board/new-board.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    HttpClientModule,

    ProfilePageModule,
    GamePageModule,
    MainPageModule,
    GameSettingsPageModule,
    BoardModule,
    ProfileInfoModule,
    NewBoardModule,
  ],
  providers: [GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
