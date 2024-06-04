import { NgModule } from '@angular/core';

import { GamePageComponent } from './game-page.component';
import { NewBoardModule } from '../../components/new-board/new-board.module';
import { BoardModule } from '../../components/board/board.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    GamePageComponent,
  ],
  imports: [
    NewBoardModule,
    BoardModule,
    CommonModule,
  ],
  providers: [],
  exports: [
    GamePageComponent,
  ],
  bootstrap: [GamePageComponent]
})
export class GamePageModule { }
