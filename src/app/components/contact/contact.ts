import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="contato" class="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-white pt-32 pb-12 px-6 rounded-t-[3rem] mt-[-2rem] relative z-20 transition-colors duration-500">
      <div class="max-w-7xl mx-auto flex flex-col items-center text-center">
        
        <h2 class="text-zinc-500 uppercase tracking-[0.3em] text-xs font-bold mb-8">
          {{ settings.language() === 'en' ? "What's Next?" : 'E agora?' }}
        </h2>

        <h3 class="text-6xl md:text-[8rem] font-black tracking-tighter leading-none mb-12 hover:scale-105 transition-transform duration-500 cursor-pointer">
          LET'S TALK.
        </h3>

        <div class="flex flex-col md:flex-row gap-6 mb-24">
          <a href="mailto:gabrielmartielo3214l@gmail.com" class="px-8 py-4 bg-white text-zinc-950 font-bold uppercase tracking-widest text-xs rounded-full hover:bg-zinc-300 transition-colors">
            {{ settings.language() === 'en' ? 'Send an Email' : 'Enviar um Email' }}
          </a>
          <a href="https://www.linkedin.com/in/gabrielmartielo" target="_blank" class="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-colors">
            LinkedIn
          </a>
          <a href="https://github.com/smartielo" target="_blank" class="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest text-xs rounded-full hover:bg-white/10 transition-colors">
            GitHub
          </a>
        </div>

        <div class="w-full flex flex-col md:flex-row justify-between items-center border-t border-white/10 pt-8 text-xs text-zinc-500 font-medium uppercase tracking-widest">
          <p>© 2026 Gabriel Martielo.</p>
          <p>{{ settings.language() === 'en' ? 'Built with Angular & Tailwind' : 'Feito com Angular & Tailwind' }}</p>
        </div>

      </div>
    </section>
  `
})
export class ContactComponent {
  public settings = inject(SettingsService);
}