export interface Event {
  id: string;
  title: string;
  subtitle: string;
  place: string;
  startDate: string;
  endDate: string;
  description: string;
  image: string;
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
