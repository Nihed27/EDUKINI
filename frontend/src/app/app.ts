// app.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],   // ← RouterOutlet au lieu de FilieresComponent
  templateUrl: './app.html',
})
export class App {}