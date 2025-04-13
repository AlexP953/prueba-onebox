import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { Concert, Session } from '../../models/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shopping-cart',
  imports: [CommonModule],
  templateUrl: './shopping-cart.component.html',
  styleUrl: './shopping-cart.component.scss',
})
export class ShoppingCartComponent {
  @Input() items: { session: Session; quantity: number }[] = [];
  @Input() concert: Concert | null = null;


  @Output() remove = new EventEmitter<string>();

  removeItem(sessionId: string) {
    this.remove.emit(sessionId);
  }
  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['items']) {

      this.items = this.items.map((item) => ({
        ...item,
        title: this.concert?.title,
      }));
    }
  }

  
}
