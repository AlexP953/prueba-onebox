import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Concert, Session } from '../../models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-list.component.html'
})
export class SessionListComponent {
  @Input() concert: Concert | null = null;
  @Input() sessions: Session[] = [];
  @Input() selectedSessions: {session: Session, quantity: number}[] = [];
  @Output() selectionChanged = new EventEmitter<{session: Session, quantity: number}>();

  getQuantityForSession(sessionId: string): number {
    const selected = this.selectedSessions.find(
      item => item.session.id === sessionId
    );
    return selected ? selected.quantity : 0;
  }

  updateQuantity(session: Session, change: number) {
    const currentQuantity = this.getQuantityForSession(session.id);
    const newQuantity = currentQuantity + change;
    
    if (newQuantity < 0) return;
    if (newQuantity > session.availability) return;
    
    this.selectionChanged.emit({session, quantity: newQuantity});
  }
  
}