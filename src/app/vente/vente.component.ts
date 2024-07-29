import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-vente',
  standalone: true,
  imports: [RouterModule,TableComponent],
  templateUrl: './vente.component.html',
  styleUrl: './vente.component.css'
})
export class VenteComponent {

}
