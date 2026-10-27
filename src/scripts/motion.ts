import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

export function initMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add({
    reduced: '(prefers-reduced-motion: reduce)',
    desktop: '(min-width: 1024px) and (pointer: fine)',
    mobile: '(max-width: 1023px), (pointer: coarse)',
  }, (context) => {
    if (context.conditions?.reduced) return;
    let lenis: Lenis | undefined;
    let disposed = false;
    const updateScroll = () => ScrollTrigger.update();
    const tick = (time: number) => lenis?.raf(time * 1000);
    const onMenu = (event: Event) => {
      const open = (event as CustomEvent<{ open: boolean }>).detail.open;
      if (open) lenis?.stop(); else lenis?.start();
    };
    const onAnchor = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>('a[href^="#"]') : null;
      if (!link || link.target === '_blank' || link.hasAttribute('download')) return;
      const hash = link.getAttribute('href');
      if (!hash || hash === '#') return;
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      const offset = hash === '#top' ? 0 : -(document.querySelector<HTMLElement>('[data-header]')?.offsetHeight ?? 88) - 20;
      lenis.scrollTo(target, {
        offset,
        onComplete: () => {
          window.history.pushState(null, '', hash);
          if (hash !== '#top') target.focus({ preventScroll: true });
        },
      });
    };

    if (context.conditions?.desktop) {
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false, autoRaf: false });
      lenis.on('scroll', updateScroll);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      window.addEventListener('site:menu', onMenu);
      document.addEventListener('click', onAnchor);
      if (document.documentElement.classList.contains('nav-open')) lenis.stop();
    }

    // Content is visible in CSS; hiding is scoped to successfully created tweens.
    gsap.from('[data-intro]', { y: 16, autoAlpha: 0, duration: 0.65, stagger: 0.09, ease: 'power2.out', clearProps: 'transform,opacity,visibility' });
    gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
      gsap.from(element, {
        y: context.conditions?.desktop ? 24 : 14, autoAlpha: 0,
        duration: 0.55, ease: 'power2.out',
        clearProps: 'transform,opacity,visibility',
        scrollTrigger: { trigger: element, start: 'top 94%', once: true },
      });
    });
    if (context.conditions?.desktop) {
      gsap.to('[data-hero-art]', { scale: 1.025, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 0.8 } });
    }
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    window.addEventListener('load', refresh, { once: true });
    void document.fonts.ready.then(refresh);
    refresh();

    return () => {
      disposed = true;
      window.removeEventListener('load', refresh);
      window.removeEventListener('site:menu', onMenu);
      document.removeEventListener('click', onAnchor);
      gsap.ticker.remove(tick);
      lenis?.off('scroll', updateScroll);
      lenis?.destroy();
    };
  });
  // No client-side router: a language change performs a normal navigation.
  window.addEventListener('pagehide', (event) => { if (!event.persisted) media.revert(); });
}
