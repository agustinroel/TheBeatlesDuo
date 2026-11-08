import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-booking-cta',
  standalone: true,
  templateUrl: './booking-cta.component.html',
  styleUrl: './booking-cta.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingCtaComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly ctaSection = viewChild.required<ElementRef<HTMLElement>>('ctaSection');
  readonly magneticWrap = viewChild.required<ElementRef<HTMLElement>>('magneticWrap');
  readonly magneticBtn = viewChild.required<ElementRef<HTMLElement>>('magneticBtn');
  readonly magneticContent = viewChild.required<ElementRef<HTMLElement>>('magneticContent');

  readonly whatsappUrl = 'https://wa.me/34663034905';
  readonly isMagnetActive = signal(false);

  constructor() {
    afterNextRender(() => {
      this.setupMagneticAndScrollPhysics();
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

    // Nocturnal GSAP quickTo Magnetic Physics
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
