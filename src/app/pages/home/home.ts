import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, PLATFORM_ID, inject } from '@angular/core';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { AboutComponent } from '../../components/about/about';
import { ContactComponent } from '../../components/contact/contact';
import { CommandPaletteComponent } from '../../components/command-palette/command-palette';
import { HeroComponent } from '../../components/hero/hero';
import { LabsComponent } from '../../components/labs/labs';
import { NavbarComponent } from '../../components/navbar/navbar';
import { ProductsComponent } from '../../components/products/products';
import { StackComponent } from '../../components/stack/stack';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [NavbarComponent, CommandPaletteComponent, HeroComponent, ProductsComponent, LabsComponent, StackComponent, AboutComponent, ContactComponent],
  template: `
    <app-navbar></app-navbar>
    <app-command-palette></app-command-palette>

    <div class="fixed inset-0 pointer-events-none z-[-1] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    <div class="fixed inset-0 pointer-events-none z-[100] opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

    <div id="custom-cursor" class="fixed top-0 left-0 w-7 h-7 mix-blend-difference pointer-events-none z-[9999] hidden md:block">
      <svg viewBox="0 0 24 24" fill="white" class="w-full h-full drop-shadow-sm">
        <path d="M4 2.5L18 11.5L11.5 13L14 19.5L11 20.5L8.5 14L3 18V2.5Z" stroke="black" stroke-width="0.5" stroke-linejoin="round"/>
      </svg>
    </div>

    <main id="top" class="min-h-screen w-full selection:bg-zinc-800 selection:text-zinc-50">
      <app-hero></app-hero>
      <app-products></app-products>
      <app-labs></app-labs>
      <app-stack></app-stack>
      <app-about></app-about>
      <app-contact></app-contact>
    </main>
  `
})
export class HomePageComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    window.addEventListener('mousemove', (e) => {
      gsap.to('#custom-cursor', {
        x: e.clientX,
        y: e.clientY,
        duration: 0.05,
        ease: 'power2.out'
      });
    });

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
    });

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  }
}
