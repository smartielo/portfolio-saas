import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 p-4 md:px-6 md:py-8 flex items-center justify-center pointer-events-none">
      
      <nav class="pointer-events-auto w-full md:w-auto bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full px-6 py-3 flex items-center justify-between md:justify-center gap-4 md:gap-8 shadow-2xl">
        
        <a href="#top" (click)="scrollTo('#top', $event)" class="text-zinc-900 dark:text-zinc-50 font-black tracking-tighter text-lg md:mr-4">GM.</a>
        
        <div class="hidden md:flex items-center gap-6">
          <a href="#produtos" (click)="scrollTo('#produtos', $event)" class="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Produtos</a>
          <a href="#stack" (click)="scrollTo('#stack', $event)" class="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Stack</a>
          <a href="#sobre" (click)="scrollTo('#sobre', $event)" class="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Sobre</a>
        </div>

        <div class="hidden md:block h-4 w-[1px] bg-black/10 dark:bg-white/10 mx-2"></div>

        <div class="flex items-center gap-4 md:gap-0">
          
          <div class="flex md:hidden items-center gap-3 mr-1">
            <button (click)="settings.toggleTheme()" class="w-8 h-4 bg-zinc-200 dark:bg-zinc-800 rounded-full flex items-center px-0.5 border border-black/10 dark:border-white/10">
              <div class="w-3 h-3 bg-zinc-900 dark:bg-white rounded-full transition-transform" [style.transform]="settings.darkMode() ? 'translateX(16px)' : 'translateX(0px)'"></div>
            </button>
            <button (click)="settings.toggleLanguage()" class="text-[9px] font-bold text-zinc-900 dark:text-white tracking-widest">
              {{ settings.language() === 'en' ? 'EN' : 'BR' }}
            </button>
            <div class="h-3 w-[1px] bg-black/10 dark:bg-white/10 mx-1"></div>
          </div>

          <a href="#contato" (click)="scrollTo('#contato', $event)" class="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-900 dark:text-white hover:opacity-70 transition-opacity">Talk</a>
        </div>

      </nav>
    </header>

    <div class="hidden md:flex fixed top-8 right-8 z-[60] items-center gap-4 pointer-events-auto">
      <button (click)="settings.toggleTheme()" class="w-12 h-6 bg-zinc-200 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-full p-1 flex items-center cursor-pointer hover:border-black/30 dark:hover:border-white/40 transition-all">
        <div class="w-4 h-4 bg-zinc-900 dark:bg-white rounded-full transition-transform duration-500 shadow-md" [style.transform]="settings.darkMode() ? 'translateX(24px)' : 'translateX(0px)'"></div>
      </button>
      <button (click)="settings.toggleLanguage()" class="bg-zinc-200 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-black/30 dark:hover:border-white/40 transition-all text-zinc-900 dark:text-white">
        <span class="text-[9px] font-bold tracking-widest uppercase transition-opacity" [class.opacity-30]="settings.language() !== 'br'">BR</span>
        <div class="w-[1px] h-2 bg-black/20 dark:bg-white/20"></div>
        <span class="text-[9px] font-bold tracking-widest uppercase transition-opacity" [class.opacity-30]="settings.language() !== 'en'">EN</span>
      </button>
    </div>
  `
})
export class NavbarComponent {
  public settings = inject(SettingsService);

  scrollTo(target: string, event: Event) {
    event.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}