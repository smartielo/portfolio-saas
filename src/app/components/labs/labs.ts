import { AfterViewInit, Component, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="labs" class="w-full bg-zinc-950 py-28 px-6 overflow-hidden">
      <div class="mx-auto max-w-7xl">
        <header class="labs-header mb-14 md:mb-16">
          <p class="text-[11px] uppercase tracking-[0.28em] text-cyan-300/80 font-semibold mb-4">
            Research Playground
          </p>
          <h2 class="text-4xl md:text-6xl font-black tracking-tighter text-zinc-50 leading-none">
            Labs & Data Science
          </h2>
          <p class="mt-4 max-w-2xl text-sm md:text-base text-zinc-400 leading-relaxed">
            Projetos focados em analise de dados, modelagem preditiva e engenharia de features com Python.
          </p>
        </header>

        <div class="labs-grid grid grid-cols-1 md:grid-cols-6 gap-4 md:gap-5">
          <article class="labs-card md:col-span-4 rounded-3xl bg-zinc-900/30 border border-white/5 p-6 md:p-7 relative overflow-hidden">
            <div class="pointer-events-none absolute -top-20 -right-16 h-44 w-44 rounded-full bg-cyan-400/10 blur-3xl"></div>

            <div class="mb-5 flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-full border border-cyan-300/25 bg-cyan-400/10 text-cyan-200 font-mono text-xs">Python</span>
              <span class="px-3 py-1 rounded-full border border-cyan-300/25 bg-cyan-400/10 text-cyan-200 font-mono text-xs">Pandas</span>
            </div>

            <h3 class="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100 mb-3">F1 Telemetry Analysis</h3>
            <p class="text-zinc-400 text-sm md:text-base leading-relaxed max-w-2xl">
              Analise de telemetria da Formula 1 em tempo real com manipulacao de DataFrames e visualizacao de dados.
            </p>

            <div class="mt-8 flex items-center gap-2 text-zinc-500 font-mono text-xs">
              <span class="h-2 w-2 rounded-full bg-cyan-300/80"></span>
              realtime.pipeline = active
            </div>
          </article>

          <article class="labs-card md:col-span-2 rounded-3xl bg-zinc-900/30 border border-white/5 p-6 relative overflow-hidden">
            <div class="pointer-events-none absolute -bottom-16 -right-14 h-36 w-36 rounded-full bg-emerald-400/10 blur-3xl"></div>

            <div class="mb-4 flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-full border border-white/10 text-zinc-300 font-mono text-xs">Kaggle</span>
              <span class="px-3 py-1 rounded-full border border-white/10 text-zinc-300 font-mono text-xs">Machine Learning</span>
              <span class="px-3 py-1 rounded-full border border-white/10 text-zinc-300 font-mono text-xs">Scikit-learn</span>
            </div>

            <h3 class="text-xl font-bold tracking-tight text-zinc-100 mb-2">Titanic Survival Prediction</h3>
            <p class="text-zinc-400 text-sm leading-relaxed">
              Modelo de classificacao para previsao de sobreviventes do Titanic.
            </p>
          </article>

          <article class="labs-card md:col-span-3 rounded-3xl bg-zinc-900/30 border border-white/5 p-6 relative overflow-hidden">
            <div class="pointer-events-none absolute -top-16 -left-14 h-36 w-36 rounded-full bg-violet-400/10 blur-3xl"></div>

            <div class="mb-4 flex flex-wrap gap-2">
              <span class="px-3 py-1 rounded-full border border-white/10 text-zinc-300 font-mono text-xs">Power BI</span>
              <span class="px-3 py-1 rounded-full border border-white/10 text-zinc-300 font-mono text-xs">Regressao</span>
              <span class="px-3 py-1 rounded-full border border-white/10 text-zinc-300 font-mono text-xs">Python</span>
            </div>

            <h3 class="text-xl font-bold tracking-tight text-zinc-100 mb-2">House Prices Regression</h3>
            <p class="text-zinc-400 text-sm leading-relaxed">
              Modelo de regressao avancada para predicao de precos imobiliarios.
            </p>
          </article>

          <article class="labs-card md:col-span-3 rounded-3xl bg-zinc-900/30 border border-white/5 p-6">
            <p class="text-[11px] uppercase tracking-[0.22em] text-zinc-500 mb-3">Workflow</p>
            <div class="font-mono text-xs text-zinc-400 space-y-2">
              <p>01. ingest() -> clean() -> feature_engineering()</p>
              <p>02. train_test_split() -> model.fit()</p>
              <p>03. evaluate() -> deploy_insights()</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .labs-card {
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
        transition: transform 0.35s ease, border-color 0.35s ease, background-color 0.35s ease;
        will-change: transform;
      }

      .labs-card:hover {
        transform: translateY(-4px);
        border-color: rgba(255, 255, 255, 0.14);
        background-color: rgba(24, 24, 27, 0.45);
      }
    `
  ]
})
export class LabsComponent implements AfterViewInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private triggers: ScrollTrigger[] = [];

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const headerTween = gsap.from('.labs-header', {
      scrollTrigger: {
        trigger: '#labs',
        start: 'top 80%'
      },
      y: 28,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    });

    if (headerTween.scrollTrigger) {
      this.triggers.push(headerTween.scrollTrigger);
    }

    gsap.utils.toArray<HTMLElement>('.labs-card').forEach((card, index) => {
      const cardTween = gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: 'top 88%'
        },
        y: 36,
        opacity: 0,
        duration: 0.7,
        delay: index * 0.05,
        ease: 'power3.out'
      });

      if (cardTween.scrollTrigger) {
        this.triggers.push(cardTween.scrollTrigger);
      }
    });
  }

  ngOnDestroy(): void {
    this.triggers.forEach((trigger) => trigger.kill());
    this.triggers = [];
  }
}
