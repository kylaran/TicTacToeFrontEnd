import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GameSettingsPageComponent } from './game-settings-page.component';

describe('GameSettingsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        GameSettingsPageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GameSettingsPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
