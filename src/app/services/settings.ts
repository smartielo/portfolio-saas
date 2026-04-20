import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  // Certifique-se que os nomes são exatamente esses
  public darkMode = signal(true);
  public language = signal<'en' | 'br'>('en');

  toggleTheme() {
    this.darkMode.set(!this.darkMode());
    
    if (this.darkMode()) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  toggleLanguage() {
    this.language.set(this.language() === 'en' ? 'br' : 'en');
  }
}