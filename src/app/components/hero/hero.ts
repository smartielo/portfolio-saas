import { Component, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings'; // Ajustado aqui
import gsap from 'gsap';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section
      class="relative w-full min-h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-white dark:bg-zinc-950 transition-colors duration-500"
    >
      <div class="text-center z-10 flex flex-col items-center gap-6">
        <h2
          class="hero-element text-zinc-500 dark:text-zinc-400 uppercase tracking-[0.4em] text-[10px] md:text-xs font-semibold"
        >
          {{
            settings.language() === 'en'
              ? 'Digital Studio & SaaS Factory'
              : 'Estúdio Digital & Fábrica de SaaS'
          }}
        </h2>
        <h1
          class="hero-element text-6xl md:text-9xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none"
        >
          Gabriel <br />
          Martielo.
        </h1>
        <p
          class="hero-element text-zinc-600 dark:text-zinc-400 max-w-lg mt-4 text-base md:text-lg font-light"
        >
          {{
            settings.language() === 'en'
              ? 'Building high-performance digital products and immersive user experiences.'
              : 'Construindo produtos digitais de alta performance e experiências imersivas.'
          }}
        </p>
      </div>
    </section>
  `,
})
export class HeroComponent implements AfterViewInit {
  public settings = inject(SettingsService); // Precisa ser public!
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.hero-element', { y: 40, opacity: 0, duration: 1, stagger: 0.2 });
    }
  }
}
