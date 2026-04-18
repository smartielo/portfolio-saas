import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="fixed top-0 left-0 w-full z-50 px-6 py-6 flex items-center justify-center">
      
      <nav class="bg-zinc-900/40 backdrop-blur-md border border-white/10 rounded-full px-8 py-3 flex items-center gap-10 shadow-2xl transition-all duration-300">
        
        <a href="#" class="text-zinc-50 font-bold tracking-widest text-sm uppercase hover:text-white transition-colors">
          GM.
        </a>
        
        <div class="hidden md:flex items-center gap-8">
          <a href="#produtos" class="text-xs font-medium text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Produtos</a>
          <a href="#stack" class="text-xs font-medium text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Stack</a>
          <a href="#sobre" class="text-xs font-medium text-zinc-400 hover:text-white uppercase tracking-widest transition-colors">Sobre</a>
        </div>

        <a href="#contato" class="text-xs font-bold bg-zinc-50 text-zinc-950 px-5 py-2.5 rounded-full hover:bg-zinc-300 hover:scale-105 active:scale-95 transition-all duration-300">
          Let's Talk
        </a>
        
      </nav>
      
    </header>
  `,
  styles: []
})
export class NavbarComponent {}