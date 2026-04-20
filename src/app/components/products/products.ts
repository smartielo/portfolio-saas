import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="produtos" class="w-full py-32 px-6 bg-white dark:bg-zinc-950 transition-colors duration-500">
      <div class="max-w-7xl mx-auto">
        
        <div class="mb-20">
          <h2 class="text-zinc-400 uppercase tracking-[0.3em] text-xs font-bold mb-4">
            {{ settings.language() === 'en' ? 'Selected Work' : 'Trabalhos Selecionados' }}
          </h2>
          <h3 class="text-4xl md:text-6xl font-bold tracking-tighter text-zinc-900 dark:text-zinc-50">
            SaaS & Digital Systems.
          </h3>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12">
          
          <div class="group cursor-pointer">
            <div class="relative aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-6 border border-black/5 dark:border-white/5 shadow-2xl">
              <div class="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-800 font-black text-4xl">STADIUM</div>
              <div class="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span class="text-white font-bold uppercase tracking-widest text-xs border border-white/20 px-6 py-3 rounded-full backdrop-blur-md">View Project</span>
              </div>
            </div>
            <h4 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">Stadium</h4>
            <p class="text-zinc-500 text-sm leading-relaxed max-w-md">
              {{ settings.language() === 'en' 
                 ? 'Sports social network for managing teams and tournament matches.' 
                 : 'Rede social esportiva para gestão de times e organização de partidas.' }}
            </p>
          </div>

          <div class="group cursor-pointer mt-0 md:mt-24">
            <div class="relative aspect-video bg-zinc-100 dark:bg-zinc-900 rounded-3xl overflow-hidden mb-6 border border-black/5 dark:border-white/5 shadow-2xl">
              <div class="absolute inset-0 flex items-center justify-center text-zinc-300 dark:text-zinc-800 font-black text-4xl">MONEYWISE</div>
              <div class="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span class="text-white font-bold uppercase tracking-widest text-xs border border-white/20 px-6 py-3 rounded-full backdrop-blur-md">View Project</span>
              </div>
            </div>
            <h4 class="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">MoneyWise</h4>
            <p class="text-zinc-500 text-sm leading-relaxed max-w-md">
              {{ settings.language() === 'en' 
                 ? 'Cloud financial platform for personal and business asset management.' 
                 : 'Plataforma financeira em nuvem para gestão de ativos pessoais e empresariais.' }}
            </p>
          </div>

        </div>
      </div>
    </section>
  `
})
export class ProductsComponent {
  public settings = inject(SettingsService);
}