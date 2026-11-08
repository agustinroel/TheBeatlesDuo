import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  viewChild,
  viewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VenueFilter } from '../../models/gig-event.model';
import { GigScheduleService } from '../../services/gig-schedule.service';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-events-list',
  standalone: true,
  templateUrl: './events-list.component.html',
  styleUrl: './events-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventsListComponent {
  readonly scheduleService = inject(GigScheduleService);
  private readonly destroyRef = inject(DestroyRef);

  readonly sectionRoot = viewChild.required<ElementRef<HTMLElement>>('sectionRoot');
  readonly eventRows = viewChildren<ElementRef<HTMLElement>>('eventRow');

  private gsapCtx: gsap.Context | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupScrollAnimations();
    });
  }

  selectFilter(filter: VenueFilter): void {
    if (this.scheduleService.activeVenueFilter() === filter) {
      return;
    }
    this.scheduleService.setVenueFilter(filter);

    queueMicrotask(() => {
      this.animateFilteredRows();
    });
  }

  onRowInteraction(id: string | null): void {
    this.scheduleService.setHighlightedGig(id);
  }

  private setupScrollAnimations(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const rootEl = this.sectionRoot().nativeElement;
    const rows = this.eventRows().map((r) => r.nativeElement);

    this.gsapCtx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: '.events-header-block',
        start: 'top 92%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            '.events-header-block',
            { y: 18, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              duration: 1.15,
              ease: 'expo.out',
              overwrite: true,
            }
          );
        },
      });

      if (rows.length > 0) {
        ScrollTrigger.batch(rows, {
          start: 'top 94%',
          once: true,
          onEnter: (batch) => {
            gsap.fromTo(
              batch,
              {
                y: 20,
                opacity: 0.12,
              },
              {
                y: 0,
                opacity: 1,
                duration: 1.0,
                stagger: 0.05,
                ease: 'expo.out',
                overwrite: true,
              }
            );
          },
        });
      }
    }, rootEl);

    this.destroyRef.onDestroy(() => {
      this.gsapCtx?.revert();
    });
  }

  private animateFilteredRows(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const rows = this.eventRows().map((r) => r.nativeElement);
    if (rows.length === 0) {
      return;
    }

    gsap.fromTo(
      rows,
      { y: 12, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.75,
        stagger: 0.032,
        ease: 'expo.out',
        overwrite: true,
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      }
    );
  }
}
