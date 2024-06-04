import { NgModule } from '@angular/core';

import { ProfilePageComponent } from './profile-page.component';
import { ProfileInfoModule } from '../../components/profile-info/profile-info.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    ProfilePageComponent,
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
    ProfilePageComponent,
  ],
  bootstrap: [ProfilePageComponent]
})
export class ProfilePageModule { }
