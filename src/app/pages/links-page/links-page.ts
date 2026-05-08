import { AfterViewInit, Component, ElementRef, PLATFORM_ID, QueryList, ViewChildren, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { gsap } from 'gsap';

type LinkItem = {
  label: string;
  href: string;
  description: string;
  highlight?: boolean;
  icon?: string;
};

@Component({
  selector: 'app-links-page',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="relative min-h-dvh overflow-hidden bg-zinc-950 text-white px-4 py-8 sm:py-10">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute -top-24 left-1/2 h-56 w-56 -translate-x-1/2 rounded-full bg-cyan-400/15 blur-3xl"></div>
        <div class="absolute top-44 -right-20 h-52 w-52 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div class="absolute bottom-16 -left-16 h-40 w-40 rounded-full bg-emerald-300/10 blur-3xl"></div>
      </div>

      <div class="relative mx-auto w-full max-w-sm">
        <header class="mb-6 text-center">
          <div class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-zinc-900/80 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-zinc-200">
            <span class="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            Disponivel para projetos
          </div>

          <h1 class="text-2xl font-black tracking-tighter">Gabriel Martielo</h1>
          <p class="mx-auto mt-2 max-w-[30ch] text-zinc-300 text-sm">
            Estrategia, design e codigo para marcas que querem crescer com clareza e performance.
          </p>

          <div class="mt-4 grid grid-cols-3 gap-2 text-center">
            <div class="rounded-2xl border border-white/10 bg-zinc-900/70 px-2 py-2">
              <p class="text-[11px] font-semibold text-zinc-100">UX + Dev</p>
              <p class="text-[10px] text-zinc-400">Produto digital</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-zinc-900/70 px-2 py-2">
              <p class="text-[11px] font-semibold text-zinc-100">Freelance</p>
              <p class="text-[10px] text-zinc-400">BR e global</p>
            </div>
            <div class="rounded-2xl border border-white/10 bg-zinc-900/70 px-2 py-2">
              <p class="text-[11px] font-semibold text-zinc-100">Rapido</p>
              <p class="text-[10px] text-zinc-400">Entrega objetiva</p>
            </div>
          </div>
        </header>

        <div class="mb-4 rounded-3xl border border-cyan-300/30 bg-gradient-to-br from-cyan-400/12 via-zinc-900/95 to-zinc-950 p-4 shadow-[0_0_0_1px_rgba(34,211,238,0.08)]">
          <p class="text-[10px] uppercase tracking-[0.22em] text-cyan-200/80">Atalho principal</p>
          <a
            #linkBtn
            [href]="links[0].href"
            target="_blank"
            rel="noopener noreferrer"
            class="mt-2 flex items-center justify-between rounded-2xl border border-cyan-300/25 bg-zinc-900/80 px-4 py-3 text-white transition-all duration-300 hover:bg-zinc-800"
          >
            <div>
              <p class="text-sm font-semibold text-zinc-100">{{ links[0].label }}</p>
              <p class="text-xs text-zinc-300">{{ links[0].description }}</p>
            </div>
            <span class="text-cyan-200 text-base">↗</span>
          </a>
        </div>

        <nav class="flex flex-col gap-3" aria-label="Links principais">
          <a
            #linkBtn
            *ngFor="let link of secondaryLinks"
            [href]="link.href"
            target="_blank"
            rel="noopener noreferrer"
            class="group flex items-center justify-between rounded-full px-5 py-4 bg-zinc-900/75 border border-white/10 text-white hover:bg-zinc-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
          >
            <span class="flex items-center gap-2">
              <span *ngIf="link.icon" aria-hidden="true" class="text-base leading-none text-zinc-300">{{ link.icon }}</span>
              <span>
                <span class="block text-sm font-medium text-zinc-100">{{ link.label }}</span>
                <span class="block text-[11px] text-zinc-400">{{ link.description }}</span>
              </span>
            </span>
            <span class="text-zinc-400 transition-colors group-hover:text-zinc-200">→</span>
          </a>
        </nav>

        <footer class="mt-10 text-center">
          <p class="text-[10px] uppercase tracking-widest text-zinc-600">
            Gabriel Martielo Studio. © 2026
          </p>
        </footer>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
        background: #09090b;
      }

      a {
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
      }
    `
  ]
})
export class LinksPageComponent implements AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChildren('linkBtn', { read: ElementRef })
  private linkButtons!: QueryList<ElementRef<HTMLElement>>;

  links: LinkItem[] = [
    {
      label: 'Acessar Workspace Central',
      href: 'https://meudominio.com/workspace',
      highlight: true,
      icon: '✦',
      description: 'Projetos, materiais e operacao centralizada.'
    },
    {
      label: 'Portfolio Completo',
      href: 'https://meudominio.com',
      icon: '◉',
      description: 'Cases e resultados em detalhe.'
    },
    {
      label: 'GitHub',
      href: 'https://github.com/seuusuario',
      icon: '⌘',
      description: 'Codigo, estudos e experimentos.'
    },
    {
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/seuusuario',
      icon: 'in',
      description: 'Trajetoria e networking profissional.'
    },
    {
      label: 'Falar no WhatsApp',
      href: 'https://wa.me/5500000000000',
      icon: '✆',
      description: 'Contato direto para projetos.'
    }
  ];

  get secondaryLinks(): LinkItem[] {
    return this.links.slice(1);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const elements = this.linkButtons.map((ref) => ref.nativeElement);

    gsap.from(elements, {
      y: 22,
      opacity: 0,
      duration: 0.55,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 0.15
    });
  }
}
