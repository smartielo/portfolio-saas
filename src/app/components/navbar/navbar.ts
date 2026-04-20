import { Component, inject } from '@angular/core'; // Importe o inject
import { CommonModule } from '@angular/common';
import { SettingsService } from '../../services/settings';
import Lenis from 'lenis';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 px-6 py-8 flex items-center justify-center pointer-events-none">
      
      <nav class="pointer-events-auto bg-white/70 dark:bg-zinc-900/40 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full px-8 py-3 flex items-center gap-8 shadow-2xl">
        <a href="#" class="text-zinc-900 dark:text-zinc-50 font-black tracking-tighter text-lg mr-4">GM.</a>
        
        <div class="hidden md:flex items-center gap-6">
          <a href="#produtos" class="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Produtos</a>
          <a href="#stack" class="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Stack</a>
          <a href="#sobre" class="text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors">Sobre</a>
        </div>

        <div class="h-4 w-[1px] bg-black/10 dark:bg-white/10 mx-2"></div>

        <a href="#contato" class="text-[10px] uppercase tracking-[0.2em] font-black text-zinc-900 dark:text-white hover:opacity-70 transition-opacity">Talk</a>
      </nav>

    </header>

    <div class="fixed top-8 right-8 z-[60] flex items-center gap-4 pointer-events-auto">
      
      <button (click)="settings.toggleTheme()" 
              class="w-12 h-6 bg-zinc-200 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-full p-1 flex items-center cursor-pointer hover:border-black/30 dark:hover:border-white/40 transition-all">
        <div class="w-4 h-4 bg-zinc-900 dark:bg-white rounded-full transition-transform duration-500 shadow-md"
             [style.transform]="settings.darkMode() ? 'translateX(24px)' : 'translateX(0px)'">
        </div>
      </button>

      <button (click)="settings.toggleLanguage()" 
              class="bg-zinc-200 dark:bg-zinc-800 border border-black/10 dark:border-white/10 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:border-black/30 dark:hover:border-white/40 transition-all text-zinc-900 dark:text-white">
        <span class="text-[9px] font-bold tracking-widest uppercase transition-opacity"
              [class.opacity-30]="settings.language() !== 'br'">BR</span>
        <div class="w-[1px] h-2 bg-black/20 dark:bg-white/20"></div>
        <span class="text-[9px] font-bold tracking-widest uppercase transition-opacity"
              [class.opacity-30]="settings.language() !== 'en'">EN</span>
      </button>

    </div>
  `,
  styles: [],
})
export class NavbarComponent {
  public settings = inject(SettingsService);

  // Método para rolagem suave interceptando o clique padrão
  scrollTo(target: string, event: Event) {
    event.preventDefault(); // Evita que a URL dê um "pulo" instantâneo
    
    // Procura a seção na tela (ex: #produtos)
    const element = document.querySelector(target);
    
    if (element) {
      // O navegador tenta rolar, e o Lenis entra em ação deixando suave
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
