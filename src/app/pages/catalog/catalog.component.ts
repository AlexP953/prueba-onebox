import { Component, inject, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { Concert } from '../../models/interfaces';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.scss'
})
export class CatalogComponent implements OnInit{
  
  private eventService = inject(EventsService);
  private router = inject(Router);
  private sanitizer = inject(DomSanitizer);

  events: Concert[] = [];

  ngOnInit(): void {
    this.eventService.getEvents().subscribe(data => {
      this.events = data.map(event => ({
        ...event,
        safeDescription: this.sanitizer.bypassSecurityTrustHtml(event.description)
      }))
      .sort((a: any, b:any) => a.endDate - b.endDate);  
    });
  }
  

  navigateToEvent(id:string){
    this.router.navigateByUrl(`/event/${id}`);
  }
}