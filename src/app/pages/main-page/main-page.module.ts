import { NgModule } from '@angular/core';

import { MainPageComponent } from './main-page.component';
import { ProfileInfoModule } from '../../components/profile-info/profile-info.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    MainPageComponent,
  ],
  imports: [
    ProfileInfoModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  exports: [
    MainPageComponent,
  ],
  bootstrap: [MainPageComponent]
})
export class MainPageModule { }
