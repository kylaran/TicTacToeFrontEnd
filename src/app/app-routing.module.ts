import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamePageComponent } from './pages/game-page/game-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { GameSettingsPageComponent } from './pages/game-settings-page/game-settings-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: 'game-page', component: GamePageComponent},
  { path: 'game-settings-page', component: GameSettingsPageComponent},
  { path: 'profile-page', component: ProfilePageComponent},
  { path: '', component: MainPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

