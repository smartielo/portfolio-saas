import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';
import { HeroComponent } from "./components/hero/hero";
import { ProductsComponent } from './components/products/products';
import { StackComponent } from './components/stack/stack';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, HeroComponent, ProductsComponent, StackComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App { 
  title = 'portfolio-saas';
}