import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private http = inject(HttpClient);

  getEvents() {
    return this.http.get<Event[]>('/assets/data/events.json');
  }

  getEventInfo(id: string) {
    return this.http.get<Event>(`/assets/data/events-info-${id}.json`);
  }
  
}
