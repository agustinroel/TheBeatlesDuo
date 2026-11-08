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

@Component({
  selector: 'app-hero-section',
  standalone: true,
  templateUrl: './hero-section.component.html',
  styleUrl: './hero-section.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeroSectionComponent {
  private readonly destroyRef = inject(DestroyRef);

  readonly heroRoot = viewChild.required<ElementRef<HTMLElement>>('heroRoot');
  readonly titleChars = viewChildren<ElementRef<HTMLElement>>('titleChar');
  readonly illustrationStage = viewChild.required<ElementRef<HTMLElement>>('illustrationStage');
  readonly scrollTriggerBtn = viewChild.required<ElementRef<HTMLElement>>('scrollTriggerBtn');

  constructor() {
    afterNextRender(() => {
      this.initHeroAnimation();
    });
  }

  scrollToDates(): void {
    const target = document.getElementById('proximos-eventos');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  private initHeroAnimation(): void {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    const rootEl = this.heroRoot().nativeElement;
    const charEls = this.titleChars().map((c) => c.nativeElement);
    const stageEl = this.illustrationStage().nativeElement;
    const cueEl = this.scrollTriggerBtn().nativeElement;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'expo.out',
        },
      });

      tl.fromTo(
        '.hero-topbar',
        { y: -12, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.2 },
        0
      )
        .fromTo(
          stageEl,
          { scale: 1.04, autoAlpha: 0 },
          { scale: 1, autoAlpha: 1, duration: 1.8, ease: 'expo.out' },
          0.1
        )
        .fromTo(
          charEls,
          {
            y: 28,
            autoAlpha: 0,
          },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.35,
            stagger: 0.045,
            ease: 'expo.out',
          },
          0.35
        )
        .fromTo(
          '.duo-flank-line',
          { scaleX: 0, autoAlpha: 0 },
          { scaleX: 1, autoAlpha: 1, duration: 1.1, ease: 'expo.out' },
          0.75
        )
        .fromTo(
          '.hero-editorial-tagline',
          { y: 14, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2 },
          0.85
        )
        .fromTo(
          '.hero-subtitle-deck',
          { y: 16, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.2 },
          0.95
        )
        .fromTo(
          cueEl,
          { y: 12, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.15 },
          1.1
        );
    }, rootEl);

    this.destroyRef.onDestroy(() => {
      ctx.revert();
    });
  }
}
