import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ClientService, Client } from '../client.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
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
  currentPage = 1;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50, 100]; 

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.clients$.subscribe(clients => {
      this.dataSource.data = clients;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.currentPage = 1; // Reset to first page on filter
  }

  get paginatedData() {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.dataSource.filteredData.slice(start, end);
  }

  nextPage() {
    if ((this.currentPage * this.pageSize) < this.dataSource.filteredData.length) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  getClientProperty(client: Client, property: string) {
    return client[property];
  }

  changePageSize(event: Event) {
    const newPageSize = (event.target as HTMLSelectElement).value;
    this.pageSize = parseInt(newPageSize, 10);
    this.currentPage = 1; // Reset to first page on page size change
  }
}
