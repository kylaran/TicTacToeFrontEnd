import { Injectable } from "@angular/core";
import { HttpAngularService } from "./http-angular.service";
import { environment } from "../environments/environment";
import { AddBalanceDto, BalanceVm, GameHistorySearchDto, GameHistoryVm, UserDto, UserVm } from "../models/models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: "root",
  })
  
export class UserService {
    private apiUrl: string = environment.backend.api_url;

    constructor(private http: HttpAngularService) { }

    userInit(dto: UserDto): Observable<UserVm> {
        return this.http.post(this.apiUrl + "/api/user", dto)
    } 
    getUserById(id: number): Observable<UserVm> {
        return this.http.get(this.apiUrl + "/api/user/"+ id)
    } 
    addFreeCoin(dto: AddBalanceDto): Observable<UserVm> {
        return this.http.post(this.apiUrl + "/api/user/coin", dto)
    } 
    getHistory(dto: GameHistorySearchDto): Observable<GameHistoryVm> {
        return this.http.get(this.apiUrl + "/api/user/history", dto)
    } 
    getBalance(id: number): Observable<BalanceVm> {
        return this.http.get(this.apiUrl + "/api/user/balance/"+ id)
    }
}