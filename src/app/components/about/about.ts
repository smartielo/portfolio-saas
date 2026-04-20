import { Component, AfterViewInit, inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';
import gsap from 'gsap';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="sobre" class="w-full py-32 px-6 bg-white dark:bg-[#050505] transition-colors duration-500 overflow-hidden font-sans">
      <div class="max-w-6xl mx-auto">
        
        <div class="mb-16 about-header">
          <h2 class="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-4">
             {{ settings.language() === 'en' ? 'My Code Journey' : 'Minha Jornada' }}
          </h2>
          <h3 class="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 dark:text-zinc-50 leading-none">
            {{ settings.language() === 'en' ? 'Activity & Background' : 'Atividade & Trajetória' }}
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 about-grid">
          
          <div class="bento-card md:col-span-2 relative p-8 md:p-12 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden group"
               (mousemove)="handleTilt($event)" (mouseleave)="resetTilt($event)">
            
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            
            <p class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-6">Background</p>
            <h4 class="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-4 tracking-tight">
              Computer Science & Fullstack Engineering.
            </h4>
            <p class="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed max-w-lg">
              {{ settings.language() === 'en'
                 ? 'Focused on building scalable data architectures and high-performance mobile applications using modern frameworks like Angular, Next.js, and Flutter.'
                 : 'Focado em construir arquiteturas de dados escaláveis e aplicativos mobile de alta performance usando frameworks modernos.' }}
            </p>
          </div>

          <div class="bento-card relative p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-black/5 dark:border-white/5 overflow-hidden flex flex-col justify-between group"
               (mousemove)="handleTilt($event)" (mouseleave)="resetTilt($event)">
            
            <div class="absolute top-0 right-0 w-32 h-32 bg-white/5 dark:bg-white/10 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-700 pointer-events-none"></div>

            <div>
              <div class="flex items-center gap-2 mb-2">
                <div class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <p class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Bauru, SP — Brazil</p>
              </div>
              <h4 class="text-3xl font-light text-zinc-900 dark:text-white tracking-tighter">{{ currentTime }}</h4>
            </div>
            
            <div class="mt-8">
              <p class="text-xs text-zinc-500 dark:text-zinc-400 font-medium">GMT-3 Timezone</p>
            </div>
          </div>

          <div class="bento-card md:col-span-3 relative p-8 bg-zinc-50 dark:bg-zinc-900/40 rounded-[2rem] border border-black/5 dark:border-white/5 group"
               (mousemove)="handleTilt($event)" (mouseleave)="resetTilt($event)">
            
            <div class="flex justify-between items-center mb-8">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-zinc-900 dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                <div>
                  <p class="text-[10px] uppercase tracking-widest text-zinc-500 font-bold leading-none">GitHub Activity</p>
                  <a href="#" class="text-sm font-medium text-zinc-900 dark:text-zinc-300 hover:text-blue-500 transition-colors">github.com/smartielo ↗</a>
                </div>
              </div>
            </div>

            <div class="flex gap-1 overflow-x-auto pb-2 scrollbar-hide opacity-80 group-hover:opacity-100 transition-opacity">
              <div *ngFor="let col of githubCols" class="flex flex-col gap-1">
                <div *ngFor="let level of col" 
                     class="w-3 h-3 rounded-[2px] transition-colors duration-300"
                     [ngClass]="{
                       'bg-zinc-200 dark:bg-zinc-800': level === 0,
                       'bg-[#9be9a8] dark:bg-[#0e4429]': level === 1,
                       'bg-[#40c463] dark:bg-[#006d32]': level === 2,
                       'bg-[#30a14e] dark:bg-[#26a641]': level === 3,
                       'bg-[#216e39] dark:bg-[#39d353]': level === 4
                     }">
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Esconde a barra de rolagem no mapa do github em telas pequenas */
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    
    .bento-card {
      transition: transform 0.1s ease-out, background-color 0.5s ease, border-color 0.5s ease;
      will-change: transform;
    }
  `]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  public settings = inject(SettingsService);
  private platformId = inject(PLATFORM_ID);
  
  public currentTime: string = '';
  private timer: any;
  public githubCols: number[][] = [];

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.updateTime();
      this.timer = setInterval(() => this.updateTime(), 1000);
      
      // Chamando a função que busca dados reais
      this.loadGithubData();
    }
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      gsap.from('.about-header', { scrollTrigger: { trigger: '#sobre', start: 'top 80%' }, y: 30, opacity: 0, duration: 1 });
      gsap.from('.bento-card', { scrollTrigger: { trigger: '.about-grid', start: 'top 85%' }, y: 50, opacity: 0, duration: 1, stagger: 0.15, ease: 'power3.out' });
    }
  }

  ngOnDestroy() {
    if (this.timer) clearInterval(this.timer);
  }

  // --- HORA E GITHUB REAL ---

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('en-US', { timeZone: 'America/Sao_Paulo', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  }

  async loadGithubData() {
    try {
      // API pública que transforma seu grid do Github em JSON. Substitua 'gabrielmartielo' se seu user for outro
      const res = await fetch('https://github-contributions-api.jasonbarry.app/v1/smartielo');
      if (!res.ok) throw new Error('Falha na API do Github');
      
      const data = await res.json();
      
      // Pegamos o ano atual de contribuições
      const currentYear = data.years[0];
      
      // Pegamos apenas as últimas 45 semanas para caber no nosso layout
      const weeks = currentYear.contributions.slice(-45);
      
      this.githubCols = weeks.map((week: any) => {
        return week.days.map((day: any) => {
          const count = day.contributionCount;
          // Traduz a quantidade de commits para a cor (0 a 4)
          if (count === 0) return 0;
          if (count <= 2) return 1;
          if (count <= 5) return 2;
          if (count <= 8) return 3;
          return 4;
        });
      });
    } catch (error) {
      console.warn('API de contribuições falhou. Usando fallback de UI.', error);
      this.generateGithubMock(); // Plano B automático!
    }
  }

  generateGithubMock() {
    for (let i = 0; i < 45; i++) {
      const col = [];
      for (let j = 0; j < 7; j++) {
        const rand = Math.random();
        let level = 0;
        if (rand > 0.6) level = 1;
        if (rand > 0.8) level = 2;
        if (rand > 0.9) level = 3;
        if (rand > 0.95) level = 4;
        col.push(level);
      }
      this.githubCols.push(col);
    }
  }

  // --- O Efeito 3D Mágico ---

  handleTilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transition = 'none';
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  resetTilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transition = 'transform 0.5s ease-out';
    card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  }
}