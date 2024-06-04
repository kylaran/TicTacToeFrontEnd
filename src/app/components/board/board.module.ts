import { NgModule } from '@angular/core';

import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BoardComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    BoardComponent,
  ],
  bootstrap: [BoardComponent]
})
export class BoardModule { }
