import { Injectable } from "@angular/core";
import { HttpAngularService } from "./http-angular.service";
import { environment } from "../environments/environment";
import { CreateGameDto, FinishGameDto, GameVm, JoinGameDto, ListGamesVm, MoveGameDto, SSEVm, SearchGameDto } from "../models/models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  
export class GameSrvService {
    private apiUrl: string = environment.backend.api_url;

    constructor(private http: HttpAngularService) { }

    createGame(dto: CreateGameDto): Observable<GameVm> {
        return this.http.post(this.apiUrl + "/api/game", dto)
    } 
    joinGame(dto: JoinGameDto): Observable<GameVm> {
        return this.http.post(this.apiUrl + "/api/game/join", dto)
    } 
    moveInGame(dto: MoveGameDto): Observable<GameVm> {
        return this.http.post(this.apiUrl + "/api/game/move", dto)
    } 
    giveUpInGame(dto: FinishGameDto): Observable<GameVm> {
        return this.http.post(this.apiUrl + "/api/game/giveup", dto)
    } 
    quitGame(gameId: number): Observable<any> {
        return this.http.post(this.apiUrl + "/api/game/close/" + gameId)
    } 
    timeOfGame(dto: FinishGameDto): Observable<GameVm> {
        return this.http.post(this.apiUrl + "/api/game/failed", dto)
    } 
    getGameById(id: number): Observable<GameVm> {
        return this.http.get(this.apiUrl + "/api/game/"+ id)
    } 
    getListOpenGames(dto: SearchGameDto): Observable<ListGamesVm> {
        return this.http.get(this.apiUrl + "/api/game/list", dto)
    }
    moveBotGame(dto: MoveGameDto): Observable<GameVm> {
        return this.http.post(this.apiUrl + "/api/game/move/bot", dto)
    } 
    updateGame(gameId: number, userId: number): Observable<SSEVm>{
        return this.http.get(this.apiUrl + "/api/game/updates/"+ gameId + "/" + userId)
    }
}