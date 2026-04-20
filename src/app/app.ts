import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from "./components/hero/hero";
import { ProductsComponent } from './components/products/products';
import { StackComponent } from './components/stack/stack';
import { ContactComponent } from './components/contact/contact';
import { Component, AfterViewInit, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AboutComponent } from './components/about/about';
import Lenis from 'lenis';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroComponent, ProductsComponent, StackComponent, ContactComponent, AboutComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements AfterViewInit {
  title = 'portfolio-saas';
  // Injetando o ID da plataforma corretamente
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.registerPlugin(ScrollTrigger);

      // --- Lógica do Cursor Personalizado ---
      window.addEventListener('mousemove', (e) => {
        gsap.to('#custom-cursor', {
          x: e.clientX,
          y: e.clientY,
          duration: 0.1,
          ease: 'power2.out'
        });
      });

      // --- Lógica do Lenis ---
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);

      requestAnimationFrame(raf);
    }
  }
}