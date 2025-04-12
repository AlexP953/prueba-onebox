import { Routes } from '@angular/router';
import { CatalogComponent } from './pages/catalog/catalog.component';
import { EventDetailComponent } from './pages/event-detail/event-detail.component';

export const routes: Routes = [
  { path: '', component: CatalogComponent },
  { path: 'event/:id', component: EventDetailComponent },
  { path: '**', redirectTo: '' }
];
