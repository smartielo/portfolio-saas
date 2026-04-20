import { Component, AfterViewInit, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';
import gsap from 'gsap';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="produtos" class="w-full py-32 px-6 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden">
      <div class="max-w-7xl mx-auto">
        
        <div class="mb-24 flex flex-col items-center text-center">
          <h2 class="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">
            {{ settings.language() === 'en' ? 'SaaS Ecosystem' : 'Ecossistema SaaS' }}
          </h2>
          <h3 class="text-5xl md:text-7xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
            Commercial Products.
          </h3>
        </div>

        <div class="flex flex-col gap-32">
          
          <div class="project-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 order-2 lg:order-1 relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900/50 rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 group">
              <div class="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div class="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-700 font-black text-5xl md:text-6xl tracking-tighter group-hover:scale-105 transition-transform duration-700 mix-blend-overlay">MOTORCALC</div>
            </div>
            <div class="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-500 mb-4">Fintech SaaS</span>
              <h4 class="text-4xl font-bold text-zinc-900 dark:text-white mb-6">MotorCalc</h4>
              <p class="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
                {{ settings.language() === 'en' 
                   ? 'Automotive financing simulation engine and CRM. Analyzes market rates, insurance costs, and depreciation models for mid-range vehicles.' 
                   : 'Motor de simulação de financiamento automotivo e CRM. Analisa taxas de mercado, custos de seguro e modelos de depreciação.' }}
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Python</span>
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Data Analytics</span>
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Angular</span>
              </div>
              <a href="#" class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:opacity-70 transition-opacity">
                {{ settings.language() === 'en' ? 'Launch App' : 'Iniciar App' }}
                <span class="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>

          <div class="project-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-5 flex flex-col items-start lg:pl-12">
              <span class="text-xs font-bold uppercase tracking-widest text-blue-500 mb-4">AI Integration SaaS</span>
              <h4 class="text-4xl font-bold text-zinc-900 dark:text-white mb-6">DocuBabel</h4>
              <p class="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
                {{ settings.language() === 'en' 
                   ? 'AI-powered bilingual documentation tool. Seamlessly synchronizes technical specs in English and Portuguese for multinational dev teams.' 
                   : 'Ferramenta de documentação bilíngue com IA. Sincroniza especificações técnicas em Inglês e Português para times de desenvolvimento multinacionais.' }}
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Next.js</span>
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">AI / LLM</span>
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Docker</span>
              </div>
              <a href="#" class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:opacity-70 transition-opacity">
                {{ settings.language() === 'en' ? 'Launch App' : 'Iniciar App' }}
                <span class="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
            <div class="lg:col-span-7 relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900/50 rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 group">
              <div class="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div class="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-700 font-black text-5xl md:text-6xl tracking-tighter group-hover:scale-105 transition-transform duration-700 mix-blend-overlay">DOCUBABEL</div>
            </div>
          </div>

          <div class="project-card grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div class="lg:col-span-7 order-2 lg:order-1 relative aspect-[4/3] bg-zinc-100 dark:bg-zinc-900/50 rounded-[2rem] overflow-hidden border border-black/5 dark:border-white/5 group">
              <div class="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-300 dark:from-zinc-800 dark:to-zinc-900"></div>
              <div class="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-700 font-black text-5xl md:text-6xl tracking-tighter group-hover:scale-105 transition-transform duration-700 mix-blend-overlay">ARENA MATCH</div>
            </div>
            <div class="lg:col-span-5 order-1 lg:order-2 flex flex-col items-start">
              <span class="text-xs font-bold uppercase tracking-widest text-purple-500 mb-4">Sports Management SaaS</span>
              <h4 class="text-4xl font-bold text-zinc-900 dark:text-white mb-6">Arena Match</h4>
              <p class="text-zinc-600 dark:text-zinc-400 text-lg mb-8 leading-relaxed">
                {{ settings.language() === 'en' 
                   ? 'League management and tournament organizer platform. Handles team registrations, bracket generation, and live match scoring.' 
                   : 'Plataforma de gestão de ligas e organizador de torneios. Lida com inscrições de times, geração de chaves e pontuação ao vivo.' }}
              </p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Kotlin</span>
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Mobile First</span>
                <span class="px-4 py-2 text-[10px] font-bold uppercase tracking-widest border border-black/10 dark:border-white/10 rounded-full text-zinc-800 dark:text-zinc-300">Supabase</span>
              </div>
              <a href="#" class="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-zinc-900 dark:text-white hover:opacity-70 transition-opacity">
                {{ settings.language() === 'en' ? 'Launch App' : 'Iniciar App' }}
                <span class="group-hover:translate-x-2 transition-transform">→</span>
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ProductsComponent implements AfterViewInit {
  public settings = inject(SettingsService);
  private platformId = inject(PLATFORM_ID);

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const cards = document.querySelectorAll('.project-card');
      cards.forEach((card) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: 'top 85%' },
          y: 60, opacity: 0, duration: 1.2, ease: 'power3.out'
        });
      });
    }
  }
}