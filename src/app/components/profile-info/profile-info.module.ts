import { NgModule } from '@angular/core';

import { ProfileInfoComponent } from './profile-info.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    ProfileInfoComponent,
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    ProfileInfoComponent,
  ],
  bootstrap: [ProfileInfoComponent]
})
export class ProfileInfoModule { }
