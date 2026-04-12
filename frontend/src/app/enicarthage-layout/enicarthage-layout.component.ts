import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-enicarthage-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './enicarthage-layout.component.html',
  styleUrl: './enicarthage-layout.component.css'
})
export class EnicarthageLayoutComponent {}