import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { UserVm } from '../../models/models';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'profile-info-app',
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit{

  @Input() fromPage!: string;

  @Input() userData!: UserVm;

  constructor(
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
  }

}
