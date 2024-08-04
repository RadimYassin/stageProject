import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-add-client-page',
  standalone: true,
  imports: [CommonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatSelectModule],
  templateUrl: './add-client-page.component.html',
  styleUrls: ['./add-client-page.component.css']
})
export class AddClientPageComponent {
  newClientForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {
    this.newClientForm = this.fb.group({
      supplier: [false],
      NOM: ['', Validators.required],
      name2: ['', ],
      CLIENT_CODE: ['', Validators.required],
      category: ['', ],
      address: ['', ],
      city: ['', ],
      contact: ['', ],
      phone: ['', ],
      gsm: ['', ],
      fax: ['', ],
      email: ['',],
      ice: ['', ],
      representative: [''],
      if: ['', ],
      patente: ['', ],
      rc: ['', ],
      cnss: ['', ],
      credit_limit: ['', ],
      active: [false],
      tarif: ['', ]
    });
  }

  addClient() {
    if (this.newClientForm.valid) {
      const newClient = this.newClientForm.value;
      console.log('New client data:', newClient);
      this.clientService.addClient(newClient).subscribe({
        next: () => {
          this.router.navigate(['vente']);
        },
        error: (error) => {
          console.error('Error adding client:', error);
          if (error.status === 422 && error.error && error.error.errors) {
            console.error('Error details:', error.error.errors);
          }
        }
      });
    }
  }
  
  cancel() {
    this.newClientForm.reset();
  }

  private extractErrorMessage(error: any): string {
    if (error.error && error.error.errors) {
      return Object.values(error.error.errors).map((err: any) => err.join(', ')).join(' | ');
    }
    return 'Error desconocido';
  }
}
