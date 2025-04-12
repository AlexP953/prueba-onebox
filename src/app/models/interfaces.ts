import { SafeHtml } from "@angular/platform-browser";

export interface EventDetail {
  event: Concert;
  sessions: Session[];
}
export interface Concert {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
  safeDescription?: SafeHtml;
}

export interface Session {
  id: string;
  date: string;
  available: number;
}

export interface CartItem {
  eventId: string;
  sessionId: string;
  quantity: number;
}
