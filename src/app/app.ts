import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookingCtaComponent } from './components/booking-cta/booking-cta.component';
import { EventsListComponent } from './components/events-list/events-list.component';
import { HeroSectionComponent } from './components/hero-section/hero-section.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroSectionComponent, EventsListComponent, BookingCtaComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {}
