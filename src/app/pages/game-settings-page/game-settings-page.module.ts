import { NgModule } from '@angular/core';

import { GameSettingsPageComponent } from './game-settings-page.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';


@NgModule({
  declarations: [
    GameSettingsPageComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatSelectModule,
  ],
  providers: [],
  exports: [
    GameSettingsPageComponent,
  ],
  bootstrap: [GameSettingsPageComponent]
})
export class GameSettingsPageModule { }
