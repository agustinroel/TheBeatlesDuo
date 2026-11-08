import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
  viewChildren,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { VenueFilter } from '../../models/gig-event.model';
import { GigScheduleService } from '../../services/gig-schedule.service';

gsap.registerPlugin(ScrollTrigger);

export interface VenueShowcaseSlide {
  readonly id: string;
  readonly name: string;
  readonly city: string;
  readonly gigsLabel: string;
  readonly imageSrc: string;
  readonly imageAlt: string;
  readonly filterValue: VenueFilter;
}

@Component({
  selector: 'app-booking-cta',
  standalone: true,
  templateUrl: './booking-cta.component.html',
  styleUrl: './booking-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCtaComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly scheduleService = inject(GigScheduleService);

  readonly ctaSection = viewChild.required<ElementRef<HTMLElement>>('ctaSection');
  readonly magneticWrap = viewChild.required<ElementRef<HTMLElement>>('magneticWrap');
  readonly magneticBtn = viewChild.required<ElementRef<HTMLElement>>('magneticBtn');
  readonly magneticContent = viewChild.required<ElementRef<HTMLElement>>('magneticContent');
  readonly carouselTrack = viewChild.required<ElementRef<HTMLElement>>('carouselTrack');
  readonly slideElements = viewChildren<ElementRef<HTMLElement>>('venueSlide');

  readonly whatsappUrl = 'https://wa.me/34663034905';
  readonly instagramUrl = 'https://www.instagram.com/thebeatles_duo/';
  readonly isMagnetActive = signal(false);

  readonly venues: readonly VenueShowcaseSlide[] = [
    {
      id: 'paddys-point',
      name: "Paddy's Point",
      city: 'Torrevieja · La Zenia',
      gigsLabel: '11 fechas en 2027',
      imageSrc: '/images/paddys.png',
      imageAlt: "Logo oficial de Paddy's Point Irish Pub en La Zenia, Torrevieja",
      filterValue: "Paddy's Point",
    },
    {
      id: 'saxo-moraira',
      name: 'Saxo Disco Garden',
      city: 'Moraira',
      gigsLabel: '12 fechas en 2027',
      imageSrc: '/images/saxo.png',
      imageAlt: 'Logo oficial de Saxo Moraira',
      filterValue: 'Saxo',
    },
    {
      id: 'the-robins',
      name: "The Robin's Irish Pub",
      city: 'Alicante',
      gigsLabel: 'Directos de temporada',
      imageSrc: '/images/robins.png',
      imageAlt: "Logo oficial de The Robin's Irish Pub en Alicante",
      filterValue: 'The Robins',
    },
    {
      id: 'puerta-falsa',
      name: 'La Puerta Falsa',
      city: 'Murcia',
      gigsLabel: 'Sala de conciertos',
      imageSrc: '/images/puertafalsa.png',
      imageAlt: 'Logo oficial de La Puerta Falsa en Murcia',
      filterValue: 'Puerta Falsa',
    },
  ];

  readonly activeSlideIndex = signal(0);
  readonly isCarouselPaused = signal(false);
  private autoPlayTimer: ReturnType<typeof setInterval> | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupMagneticAndScrollPhysics();
      this.setupCarouselAutoPlay();
    });
  }

  prevVenue(): void {
    const total = this.venues.length;
    const prev = (this.activeSlideIndex() - 1 + total) % total;
    this.scrollToSlide(prev);
  }

  nextVenue(): void {
    const total = this.venues.length;
    const next = (this.activeSlideIndex() + 1) % total;
    this.scrollToSlide(next);
  }

  scrollToSlide(index: number): void {
    this.activeSlideIndex.set(index);
    const slides = this.slideElements();
    const target = slides[index]?.nativeElement;
    const track = this.carouselTrack().nativeElement;
    if (!target || !track) {
      return;
    }

    const trackRect = track.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();
    const scrollOffset =
      track.scrollLeft +
      (targetRect.left - trackRect.left) -
      (trackRect.width - targetRect.width) / 2;

    track.scrollTo({
      left: Math.max(0, scrollOffset),
      behavior: 'smooth',
    });
  }

  onTrackScroll(): void {
    const track = this.carouselTrack().nativeElement;
    const slides = this.slideElements();
    if (!track || slides.length === 0) {
      return;
    }

    const trackCenter = track.scrollLeft + track.clientWidth / 2;
    let closestIdx = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slideRef, idx) => {
      const el = slideRef.nativeElement;
      const slideCenter = el.offsetLeft + el.offsetWidth / 2;
      const dist = Math.abs(trackCenter - slideCenter);
      if (dist < minDistance) {
        minDistance = dist;
        closestIdx = idx;
      }
    });

    if (this.activeSlideIndex() !== closestIdx) {
      this.activeSlideIndex.set(closestIdx);
    }
  }

  setCarouselPaused(paused: boolean): void {
    this.isCarouselPaused.set(paused);
  }

  selectVenueDates(filter: VenueFilter): void {
    this.scheduleService.setVenueFilter(filter);
    const eventsEl = document.getElementById('proximos-eventos');
    if (eventsEl) {
      eventsEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private setupCarouselAutoPlay(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    this.autoPlayTimer = setInterval(() => {
      if (!this.isCarouselPaused()) {
        this.nextVenue();
      }
    }, 3600);

    this.destroyRef.onDestroy(() => {
      if (this.autoPlayTimer !== null) {
        clearInterval(this.autoPlayTimer);
      }
    });
  }

  private setupMagneticAndScrollPhysics(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const sectionEl = this.ctaSection().nativeElement;
    const wrapEl = this.magneticWrap().nativeElement;
    const btnEl = this.magneticBtn().nativeElement;
    const contentEl = this.magneticContent().nativeElement;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.fromTo(
            '.cta-stage-box',
            { y: 24, opacity: 0.15 },
            {
              y: 0,
              opacity: 1,
              duration: 1.25,
              ease: 'expo.out',
              overwrite: true,
            }
          );
        },
      });
    }, sectionEl);

    const xToBtn = gsap.quickTo(btnEl, 'x', {
      duration: 0.7,
      ease: 'expo.out',
    });
    const yToBtn = gsap.quickTo(btnEl, 'y', {
      duration: 0.7,
      ease: 'expo.out',
    });

    const xToText = gsap.quickTo(contentEl, 'x', {
      duration: 0.6,
      ease: 'power3.out',
    });
    const yToText = gsap.quickTo(contentEl, 'y', {
      duration: 0.6,
      ease: 'power3.out',
    });

    const handlePointerMove = (e: PointerEvent) => {
      const rect = wrapEl.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);

      this.isMagnetActive.set(true);
      xToBtn(relX * 0.28);
      yToBtn(relY * 0.32);
      xToText(relX * 0.12);
      yToText(relY * 0.14);
    };

    const handlePointerLeave = () => {
      this.isMagnetActive.set(false);
      xToBtn(0);
      yToBtn(0);
      xToText(0);
      yToText(0);
    };

    wrapEl.addEventListener('pointermove', handlePointerMove, { passive: true });
    wrapEl.addEventListener('pointerleave', handlePointerLeave, { passive: true });
    wrapEl.addEventListener('pointercancel', handlePointerLeave, { passive: true });

    this.destroyRef.onDestroy(() => {
      wrapEl.removeEventListener('pointermove', handlePointerMove);
      wrapEl.removeEventListener('pointerleave', handlePointerLeave);
      wrapEl.removeEventListener('pointercancel', handlePointerLeave);
      ctx.revert();
    });
  }
}
