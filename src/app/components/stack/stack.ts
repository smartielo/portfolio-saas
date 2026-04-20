import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="stack" class="w-full py-24 overflow-hidden border-y border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50 backdrop-blur-sm transition-colors duration-500">
      
      <div class="max-w-7xl mx-auto px-6 mb-12 text-center md:text-left">
        <h2 class="text-zinc-400 uppercase tracking-[0.3em] text-xs font-bold">
          {{ settings.language() === 'en' ? 'Core Technologies' : 'Tecnologias Principais' }}
        </h2>
      </div>

      <div class="relative w-full flex overflow-x-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        
        <div class="flex flex-nowrap whitespace-nowrap animate-marquee items-center gap-16 py-4">
          <ng-container *ngFor="let item of [1, 2]">
            
            <span class="text-4xl md:text-6xl font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-tighter hover:text-[#7F52FF] dark:hover:text-[#7F52FF] transition-colors duration-300 cursor-default">Kotlin</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-3xl">/</span>
            
            <span class="text-4xl md:text-6xl font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-tighter hover:text-[#FFD43B] dark:hover:text-[#FFD43B] transition-colors duration-300 cursor-default">Python</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-3xl">/</span>
            
            <span class="text-4xl md:text-6xl font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-tighter hover:text-[#DD0031] dark:hover:text-[#DD0031] transition-colors duration-300 cursor-default">Angular</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-3xl">/</span>
            
            <span class="text-4xl md:text-6xl font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-tighter hover:text-black dark:hover:text-white transition-colors duration-300 cursor-default">Next.js</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-3xl">/</span>
            
            <span class="text-4xl md:text-6xl font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-tighter hover:text-[#02569B] dark:hover:text-[#02569B] transition-colors duration-300 cursor-default">Flutter</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-3xl">/</span>
            
            <span class="text-4xl md:text-6xl font-black text-zinc-300 dark:text-zinc-800 uppercase tracking-tighter hover:text-[#2496ED] dark:hover:text-[#2496ED] transition-colors duration-300 cursor-default">Docker</span>
            <span class="text-zinc-300 dark:text-zinc-700 text-3xl">/</span>
            
          </ng-container>
        </div>
        
      </div>
    </section>
  `,
  styles: [`
    .animate-marquee {
      animation: marquee 25s linear infinite;
    }
    @keyframes marquee {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `]
})
export class StackComponent {
  public settings = inject(SettingsService);
}