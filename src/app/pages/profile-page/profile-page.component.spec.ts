import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfilePageComponent } from './profile-page.component';

describe('MainPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        ProfilePageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(ProfilePageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
