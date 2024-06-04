import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { UserDto } from '../models/models';

// интерфейс для функционала кнопок
interface TgButton {
  show(): void;
  hide(): void;
  setText(text: string): void;
  onClick(fn: Function): void;
  offClick(fn: Function): void;
  enable(): void;
  disable(): void;
}

@Injectable({
  providedIn: 'root',
})
export class TelegramService {

  private mainButtonClickHandler?: Function;
  private backButtonClickHandler?: Function;

  private window;
  tg: any;

  constructor(@Inject(DOCUMENT) private _document: any) {
    this.window = this._document.defaultView;
    this.tg = this.window.Telegram.WebApp;
  }

  get MainButton(): TgButton {
    return this.tg.MainButton;
  }

  get BackButton(): TgButton {
    return this.tg.BackButton;
  }

  get UserData(): UserDto{
    return this.tg.initDataUnsafe.user;
  }

  expand(){
    this.tg.expand();
  }

  setupMainButton(text: string, callback: () => void): void {
    this.clearMainButton(); 
    this.mainButtonClickHandler = callback;
    this.MainButton.setText(text);
    this.MainButton.onClick(callback);
    this.MainButton.show();
  }

  setupBackButton(callback: () => void): void {
    this.clearBackButton();
    this.backButtonClickHandler = callback;
    this.BackButton.onClick(callback);
    this.BackButton.show();
  }

  clearMainButton(): void {
    if (this.mainButtonClickHandler) {
      this.MainButton.offClick(this.mainButtonClickHandler);
      this.mainButtonClickHandler = undefined;
    }
    this.MainButton.hide();
  }

  clearBackButton(): void {
    if (this.backButtonClickHandler) {
      this.BackButton.offClick(this.backButtonClickHandler);
      this.backButtonClickHandler = undefined;
    }
    this.BackButton.hide();
  }

  sendData(data: object) {
    this.tg.sendData(JSON.stringify(data));
  }

  showConfirm(message: string, callback: (value: boolean) => void){
    this.tg.showConfirm(message, callback);
  }

  showAlert(message: string, callback: (value: boolean) => void){
    this.tg.showAlert(message, callback);
  }

  ready() {
    this.tg.ready();
    console.log(this.tg);
  }

  enableConfirmOnClose(){
    this.tg.enableClosingConfirmation();
  }

}