import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  OnDestroy,
  PLATFORM_ID,
  ViewChild,
  inject
} from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import gsap from 'gsap';

type CommandItem = {
  label: string;
  description: string;
  target: string;
  external?: boolean;
};

@Component({
  selector: 'app-command-palette',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed bottom-4 right-4 z-[130] pointer-events-none">
      @if (isMounted) {
        <div
          #overlayRef
          class="fixed inset-0 z-[120] backdrop-blur-[1px] bg-black/30 pointer-events-auto"
          (click)="close()"
        ></div>

        <div
          #panelRef
          class="relative z-[130] mb-3 w-[23rem] max-w-[calc(100vw-1rem)] rounded-2xl border border-white/10 bg-zinc-900/90 shadow-2xl overflow-hidden pointer-events-auto"
        >
          <div role="dialog" aria-modal="true" aria-label="Quick Menu">
            <div class="px-4 py-3 border-b border-white/10 flex items-center justify-between gap-3">
              <p class="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold">Quick Menu</p>
              <p class="text-[10px] text-zinc-500">Ctrl/Cmd + K</p>
            </div>

            <div class="px-4 py-3 border-b border-white/10">
              <input
                #inputRef
                type="text"
                [value]="query"
                (input)="onQueryChange($any($event.target).value)"
                placeholder="Buscar comandos, secoes, atalhos..."
                class="w-full bg-transparent outline-none text-zinc-50 text-base placeholder:text-zinc-500"
              />
            </div>

            <div #resultsRef role="listbox" class="max-h-[44vh] overflow-y-auto py-2">
              @if (filteredCommands.length === 0) {
                <div class="px-4 py-5 text-sm text-zinc-500">Nenhum resultado encontrado.</div>
              } @else {
                @for (item of filteredCommands; track item.label; let i = $index) {
                  <button
                    type="button"
                    role="option"
                    [attr.aria-selected]="i === selectedIndex"
                    (mouseenter)="selectedIndex = i"
                    (click)="execute(item)"
                    class="w-full text-left px-4 py-3 transition-colors"
                    [class.bg-white/10]="i === selectedIndex"
                    [class.text-zinc-50]="i === selectedIndex"
                    [class.text-zinc-300]="i !== selectedIndex"
                  >
                    <div class="flex items-center justify-between gap-3">
                      <div>
                        <p class="text-sm font-semibold" [innerHTML]="highlightMatch(item.label, query)"></p>
                        <p class="text-xs text-zinc-500 mt-0.5" [innerHTML]="highlightMatch(item.description, query)"></p>
                      </div>
                      <span class="text-[10px] uppercase tracking-widest text-zinc-500">
                        {{ item.external ? 'External' : 'Section' }}
                      </span>
                    </div>
                  </button>
                }
              }
            </div>

            <div class="border-t border-white/10 p-4 bg-zinc-950/40">
              <div class="grid grid-cols-2 gap-2 mb-3">
                <div class="rounded-xl border border-white/10 bg-zinc-900/70 p-2">
                  <p class="text-[10px] uppercase tracking-widest text-zinc-500">Status</p>
                  <p class="text-xs text-emerald-300 mt-1">Disponivel para projetos</p>
                </div>
                <div class="rounded-xl border border-white/10 bg-zinc-900/70 p-2">
                  <p class="text-[10px] uppercase tracking-widest text-zinc-500">Now (GMT-3)</p>
                  <p class="text-xs text-zinc-200 mt-1 font-mono">{{ currentTime }}</p>
                </div>
              </div>

              <div class="flex items-center gap-2 flex-wrap">
                <a href="https://wa.me/5500000000000" target="_blank" rel="noopener noreferrer" class="quick-chip">WhatsApp</a>
                <a href="https://github.com/seuusuario" target="_blank" rel="noopener noreferrer" class="quick-chip">GitHub</a>
                <a href="https://www.linkedin.com/in/seuusuario" target="_blank" rel="noopener noreferrer" class="quick-chip">LinkedIn</a>
              </div>
            </div>

            <div class="px-4 py-2 border-t border-white/10 text-[10px] text-zinc-500 flex items-center justify-between">
              <span>↑ ↓ navegar</span>
              <span>Enter abrir</span>
              <span>Esc fechar</span>
            </div>
          </div>
        </div>
      }

      <div
        class="pointer-events-auto ml-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-zinc-900/85 backdrop-blur-md px-3 py-2 shadow-2xl cursor-pointer hover:bg-zinc-800/90 transition-colors"
        (click)="toggle()"
        [attr.aria-expanded]="isOpen"
        [class.opacity-70]="isAnimating"
        aria-label="Abrir quick menu"
        >
        <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-100">⌘</span>
        <span class="text-sm font-semibold tracking-tight text-zinc-100">Command</span>
        <span class="text-[10px] text-zinc-400 border border-white/10 rounded-md px-1.5 py-0.5">K</span>
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep mark.cmd-highlight {
        background: rgba(34, 211, 238, 0.2);
        color: #cffafe;
        border-radius: 4px;
        padding: 0 2px;
      }

      .quick-chip {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background: rgba(24, 24, 27, 0.8);
        color: #d4d4d8;
        border-radius: 9999px;
        font-size: 10px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        padding: 6px 10px;
        transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
      }

      .quick-chip:hover {
        background: rgba(39, 39, 42, 0.9);
        color: #fafafa;
        border-color: rgba(255, 255, 255, 0.2);
      }
    `
  ]
})
export class CommandPaletteComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('inputRef') private inputRef?: ElementRef<HTMLInputElement>;
  @ViewChild('overlayRef') private overlayRef?: ElementRef<HTMLDivElement>;
  @ViewChild('panelRef') private panelRef?: ElementRef<HTMLDivElement>;
  @ViewChild('resultsRef') private resultsRef?: ElementRef<HTMLDivElement>;

  isOpen = false;
  isMounted = false;
  isAnimating = false;
  query = '';
  selectedIndex = 0;
  private previousBodyOverflow = '';
  currentTime = '--:--:--';
  private clockInterval?: ReturnType<typeof setInterval>;
  private closeFallbackTimer?: ReturnType<typeof setTimeout>;

  commands: CommandItem[] = [
    {
      label: 'Acessar Workspace',
      description: 'Abrir central de trabalho em nova aba',
      target: 'https://meudominio.com/workspace',
      external: true
    },
    {
      label: 'Ver Produtos (SaaS)',
      description: 'Ir para secao de produtos',
      target: '#produtos'
    },
    {
      label: 'Minha Stack',
      description: 'Ir para secao de tecnologias',
      target: '#stack'
    },
    {
      label: 'Sobre Mim',
      description: 'Ir para secao sobre',
      target: '#sobre'
    },
    {
      label: 'Contato',
      description: 'Ir para secao de contato',
      target: '#contato'
    }
  ];

  get filteredCommands(): CommandItem[] {
    const normalizedQuery = this.query.trim().toLowerCase();
    if (!normalizedQuery) {
      return this.commands;
    }

    return this.commands.filter((item) =>
      `${item.label} ${item.description}`.toLowerCase().includes(normalizedQuery)
    );
  }

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.updateTime();
    this.clockInterval = setInterval(() => this.updateTime(), 1000);
  }

  @HostListener('window:keydown', ['$event'])
  onWindowKeydown(event: KeyboardEvent): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const key = event.key.toLowerCase();
    const isCmdOrCtrlK = (event.ctrlKey || event.metaKey) && key === 'k';
    const isSlash = key === '/';

    if (isCmdOrCtrlK) {
      event.preventDefault();
      this.toggle();
      return;
    }

    if (!this.isOpen && isSlash && !this.isTypingContext(event)) {
      event.preventDefault();
      this.open();
      return;
    }

    if (!this.isOpen) {
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      this.close();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.moveSelection(1);
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.moveSelection(-1);
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selected = this.filteredCommands[this.selectedIndex];
      if (selected) {
        this.execute(selected);
      }
    }
  }

  open(): void {
    if (this.isAnimating || this.isOpen) {
      return;
    }

    this.isAnimating = true;
    this.isMounted = true;
    this.isOpen = true;
    this.selectedIndex = 0;
    this.lockBodyScroll();

    setTimeout(() => {
      this.inputRef?.nativeElement.focus();
      this.animateIn();
    }, 0);
  }

  close(): void {
    if (this.isAnimating || !this.isOpen) {
      return;
    }

    this.isAnimating = true;
    this.isOpen = false;
    this.closeFallbackTimer = setTimeout(() => this.finalizeClose(), 450);
    this.animateOut(() => this.finalizeClose());
  }

  onQueryChange(value: string): void {
    this.query = value;
    this.selectedIndex = 0;
  }

  moveSelection(direction: 1 | -1): void {
    const list = this.filteredCommands;
    if (list.length === 0) {
      return;
    }

    const nextIndex = this.selectedIndex + direction;

    if (nextIndex < 0) {
      this.selectedIndex = list.length - 1;
    } else if (nextIndex >= list.length) {
      this.selectedIndex = 0;
    } else {
      this.selectedIndex = nextIndex;
    }

    this.scrollSelectedIntoView();
  }

  execute(item: CommandItem): void {
    if (item.external) {
      window.open(item.target, '_blank', 'noopener,noreferrer');
      this.close();
      return;
    }

    const element = document.querySelector(item.target);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    this.close();
  }

  highlightMatch(text: string, query: string): string {
    const normalized = query.trim();
    if (!normalized) {
      return text;
    }

    const escaped = this.escapeRegex(normalized);
    const matcher = new RegExp(`(${escaped})`, 'ig');
    return text.replace(matcher, '<mark class="cmd-highlight">$1</mark>');
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
    if (this.closeFallbackTimer) {
      clearTimeout(this.closeFallbackTimer);
    }
    this.unlockBodyScroll();
  }

  toggle(): void {
    if (this.isAnimating) {
      return;
    }

    this.isOpen ? this.close() : this.open();
  }

  private animateIn(): void {
    if (!this.overlayRef?.nativeElement || !this.panelRef?.nativeElement) {
      this.isAnimating = false;
      return;
    }

    const overlay = this.overlayRef.nativeElement;
    const panel = this.panelRef.nativeElement;

    gsap.killTweensOf([overlay, panel]);

    gsap.set(panel, {
      transformOrigin: 'bottom right',
      opacity: 0,
      y: 12,
      scale: 0.985
    });

    gsap.fromTo(
      overlay,
      { opacity: 0 },
      { opacity: 1, duration: 0.16, ease: 'power2.out' }
    );

    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        this.ngZone.run(() => {
          this.isAnimating = false;
          this.cdr.detectChanges();
        });
      }
    });

    timeline.to(panel, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.24
    });
  }

  private animateOut(onComplete: () => void): void {
    if (!this.overlayRef?.nativeElement || !this.panelRef?.nativeElement) {
      onComplete();
      return;
    }

    const overlay = this.overlayRef.nativeElement;
    const panel = this.panelRef.nativeElement;

    gsap.killTweensOf([overlay, panel]);

    gsap.to(overlay, {
      opacity: 0,
      duration: 0.14,
      ease: 'power2.in'
    });

    const timeline = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      onComplete
    });

    timeline.to(panel, {
      opacity: 0,
      y: 10,
      scale: 0.985,
      duration: 0.18
    });
  }

  private finalizeClose(): void {
    this.ngZone.run(() => {
      this.isMounted = false;
      this.query = '';
      this.selectedIndex = 0;
      this.unlockBodyScroll();
      this.isAnimating = false;
      if (this.closeFallbackTimer) {
        clearTimeout(this.closeFallbackTimer);
        this.closeFallbackTimer = undefined;
      }
      this.cdr.detectChanges();
    });
  }

  private escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private isTypingContext(event: KeyboardEvent): boolean {
    const target = event.target as HTMLElement | null;
    if (!target) {
      return false;
    }

    const tagName = target.tagName.toLowerCase();
    return (
      tagName === 'input' ||
      tagName === 'textarea' ||
      tagName === 'select' ||
      target.isContentEditable
    );
  }

  private lockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    this.previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  }

  private unlockBodyScroll(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    document.body.style.overflow = this.previousBodyOverflow;
  }

  private scrollSelectedIntoView(): void {
    if (!this.resultsRef?.nativeElement) {
      return;
    }

    const options = this.resultsRef.nativeElement.querySelectorAll('[role="option"]');
    const selected = options[this.selectedIndex] as HTMLElement | undefined;
    if (selected) {
      selected.scrollIntoView({ block: 'nearest' });
    }
  }

  private updateTime(): void {
    this.currentTime = new Date().toLocaleTimeString('en-US', {
      timeZone: 'America/Sao_Paulo',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    });
  }
}
