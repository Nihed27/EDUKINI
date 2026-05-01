import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-postlicence-layout',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './postlicence-layout.component.html',
  styleUrl: './postlicence-layout.component.css'
})
export class PostlicenceLayoutComponent {}
