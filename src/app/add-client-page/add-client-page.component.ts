// add-client-page.component.ts
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

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) {
    this.newClientForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      status: ['', Validators.required],
    });
  }

  addClient() {
    if (this.newClientForm.valid) {
      const newClient = this.newClientForm.value;
      this.clientService.addClient(newClient);
      this.router.navigate(['vente']);
    }
  }
}
