import { signal, Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EventsService } from '../../services/events.service';
import { EventDetail, Concert, Session } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { SessionListComponent } from "../../components/session-list/session-list.component";
import { ShoppingCartComponent } from '../../components/shopping-cart/shopping-cart.component';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, SessionListComponent, RouterLink, ShoppingCartComponent],
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent {
  private route = inject(ActivatedRoute);
  private eventService = inject(EventsService);

  eventID: string = '';
  event = signal<Concert | null>(null);
  sessions = signal<Session[]>([]);
  selectedSessions = signal<{session: Session, quantity: number}[]>([]);

  async ngOnInit() {
    this.eventID = this.route.snapshot.paramMap.get('id')!;
    this.eventService.getEventInfo(this.eventID).subscribe((data: EventDetail) => {
      this.event.set(data.event);
      
      const sessionsWithIds = data.sessions.map((session, index) => ({
        ...session,
        date: session.date, 
        availability: Number(session.availability),
        id: `${this.eventID}-${index}`,  
        eventId: this.eventID
      }));
      
      this.sessions.set(sessionsWithIds.sort((a, b) => 
        Number(a.date) - Number(b.date)
      ));
    });
  }

  updateSelection(session: Session, quantity: number) {
    this.selectedSessions.update(current => {
      if (quantity === 0) {
        return current.filter(item => item.session.id !== session.id);
      }
      const existingIndex = current.findIndex(
        item => item.session.id === session.id
      );
      
      if (existingIndex >= 0) {
        const updated = [...current];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        return [...current, { session, quantity }];
      }
    });
  }

  getCurrentEventSelectedSessions() {
    return this.selectedSessions().filter(
      item => (item.session as any).eventId === this.eventID
    );
  }

  removeSelectedSession(sessionId: string) {
    this.selectedSessions.update(current =>
      current.filter(item => item.session.id !== sessionId)
    );
  }
  

}