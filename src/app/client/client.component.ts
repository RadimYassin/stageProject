import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TableComponent } from '../table/table.component';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterModule,TableComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css'
})
export class ClientComponent {

}
