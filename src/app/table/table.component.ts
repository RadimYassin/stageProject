import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { ClientService, Client } from '../client.service';  // Ajusta la ruta según la estructura de tu proyecto

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule
  ]
})
export class TableComponent implements OnInit {
  displayedColumns: string[] = [
    'CLIENT_ID', 'CLIENT_CODE', 'NOM', 'NOM2', 'ADRESSE', 'VILLE', 'TEL', 'GSM', 'FAXE', 'CONTACT', 
    'MAIL', 'LOGO', 'IF', 'PATENTE', 'RC', 'CNSS', 'SEUIL_CREDIT', 'OLD_CREDIT', 
    'CLIENT_CATEGORIE_ID', 'INS_USER', 'INS_DATE', 'UPD_USER', 'UPD_DATE', 'DEFAUT', 'ACTIF', 
    'ICE', 'VendorId', 'CONTACT_ID', 'IS_CONFRERE', 'ACTION'
  ];
  dataSource = new MatTableDataSource<Client>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.clients$.subscribe(clients => {
      this.dataSource.data = clients;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
