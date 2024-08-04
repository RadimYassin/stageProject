import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

type Section = 'Vente' | 'Stock' | 'Achat' ;

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  toggleStates: Record<Section, boolean> = {
    Vente: false,
    Stock: false,
    Achat: false,
   
  };

  toggleSection(section: Section) {
    this.toggleStates[section] = !this.toggleStates[section];
  }
}
