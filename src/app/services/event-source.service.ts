import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { SSEVm } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class SseService {

  private apiUrl: string = environment.backend.api_url;

  constructor() { }

  getServerSentEvents(gameId: number, userId: number): Observable<string> {
    return new Observable<any>((observer) => {
      const eventSource = new EventSource(this.apiUrl + "/api/sse/updates/"+ gameId + "/" + userId);

      eventSource.onmessage = (event) => {
        observer.next(event.data);
      };

      eventSource.onerror = (error) => {
        observer.error(error);
      };

      return () => {
        eventSource.close();
      };
    });
  }
}
