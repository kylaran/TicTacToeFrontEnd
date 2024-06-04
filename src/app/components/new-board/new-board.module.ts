import { NgModule } from '@angular/core';

import { NewBoardComponent } from './new-board.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    NewBoardComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    NewBoardComponent,
  ],
  bootstrap: [NewBoardComponent]
})
export class NewBoardModule { }
