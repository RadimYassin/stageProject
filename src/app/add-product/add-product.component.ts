import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  productForm: FormGroup;
  formErrors = signal<{ [key: string]: string[] }>({});

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.productForm = this.fb.group({
      REFERENCE: ['', [Validators.required, Validators.maxLength(255)]],
      NOM1: ['', [Validators.required, Validators.maxLength(255)]],
      QUANTITE: ['', [Validators.required, Validators.max(999999)]],
      PRIX_ACHAT: ['', Validators.required],
      PRIX_BASE1: ['', Validators.required],
      PRIX_BASE2: ['', Validators.required],
      PRIX_REVIENT: ['', Validators.required],
      FRAIS_DIVERS: ['', Validators.required],
      MARGE: ['', Validators.required],
      PRIX_VENTE: ['', Validators.required],
      PRIX_VENTE_MINIMUM: ['', Validators.required],
      TTVA: ['', Validators.required],
      STOCK_SEUIL: ['', Validators.required],
      CATEGORIE_ID: ['', Validators.required],
      UNITE_ID: ['', Validators.required],
      INVENTORIE: [false, Validators.required], // Ajustado a booleano
      is_active: [false, Validators.required]   // Ajustado a booleano
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.http.post('http://31.220.89.29/gestcom-api/api/stock/stock_produit', this.productForm.value)
        .subscribe(
          response => {
            console.log('Product added successfully', response);
            this.router.navigate(['/listProduct']);
          },
          (error: HttpErrorResponse) => {
            console.error('There was an error!', error);
            if (error.error && error.error.errors) {
              this.formErrors.set(error.error.errors);
            } else {
              this.formErrors.set({ 'general': [error.message] });
            }
          }
        );
    }
  }
}
