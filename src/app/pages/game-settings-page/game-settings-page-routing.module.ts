import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameSettingsPageComponent } from './game-settings-page.component';

const routes: Routes = [{ path: '', component: GameSettingsPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameSettingsPageRoutingModule { }

