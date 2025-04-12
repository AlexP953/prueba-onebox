import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Concert, EventDetail } from '../models/interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);

  getEvents() {
    return this.http.get<Concert[]>("/assets/data/events.json");
  }

  getEventInfo(id: string): Observable<EventDetail>{
    return this.http.get<EventDetail>(`/assets/data/event-info-${id}.json`);
  }
  
}
