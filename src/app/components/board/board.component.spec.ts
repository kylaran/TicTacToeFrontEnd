import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BoardComponent } from './board.component';

describe('BoardComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        BoardComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ticTacToe'`, () => {
    const fixture = TestBed.createComponent(BoardComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ticTacToe');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(BoardComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, ticTacToe');
  });
});
