import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

interface Product {
  REFERENCE: string;
  NOM1: string;
  CATEGORIE_NAME: string;
  UNITE_NAME: string;
  PRIX_ACHAT: number;
  PRODUIT_ID: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  private httpClient = inject(HttpClient);
  
  data: Product[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 10;
  selectedProduct: Product | null = null;
  rowsPerPageOptions: number[] = [5, 10, 15, 20,50];

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.httpClient.get<{data: {data: Product[]}}>('http://31.220.89.29/gestcom-api/api/stock/stock_produit').subscribe((response: any) => {
      this.data = response.data.data;  
      console.log(this.data);
    });
  }

  deleteProduct(id: number): void {
    this.httpClient.delete(`http://31.220.89.29/gestcom-api/api/stock/stock_produit/${id}`).subscribe(() => {
      this.data = this.data.filter(product => product.PRODUIT_ID !== id);
    });
  }

  editProduct(product: Product): void {
    this.selectedProduct = { ...product }; // Create a copy to edit
  }

  updateProduct(): void {
    if (this.selectedProduct) {
      this.httpClient.put(`http://31.220.89.29/gestcom-api/api/stock/stock_produit/${this.selectedProduct.PRODUIT_ID}`, this.selectedProduct)
        .subscribe(() => {
          const index = this.data.findIndex(product => product.PRODUIT_ID === this.selectedProduct?.PRODUIT_ID);
          if (index !== -1 && this.selectedProduct) {
            this.data[index] = this.selectedProduct;
          }
          this.selectedProduct = null;
        });
    }
  }

  get filteredData(): Product[] {
    return this.data.filter(product => 
      product.REFERENCE.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.NOM1.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.CATEGORIE_NAME.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.UNITE_NAME.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      product.PRIX_ACHAT.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  get paginatedData(): Product[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredData.slice(startIndex, endIndex);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredData.length / this.itemsPerPage);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
}
