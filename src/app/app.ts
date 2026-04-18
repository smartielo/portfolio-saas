import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from "./components/hero/hero";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { 
  title = 'portfolio-saas';
}