import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MainPageComponent } from './main-page.component';

describe('MainPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        MainPageComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(MainPageComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
