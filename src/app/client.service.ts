// client.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Client {
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientsSubject = new BehaviorSubject<Client[]>([
    { name: 'John Doe', email: 'john.doe@example.com', phone: '+1-202-555-0187', address: '123 Elm Street, Springfield, USA', status: 'Active' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', phone: '+1-202-555-0143', address: '456 Oak Avenue, Metropolis, USA', status: 'Inactive' },
    { name: 'Alice Johnson', email: 'alice.johnson@example.com', phone: '+1-202-555-0192', address: '789 Pine Road, Gotham, USA', status: 'Active' },
  ]);

  clients$ = this.clientsSubject.asObservable();

  addClient(client: Client) {
    const clients = this.clientsSubject.value;
    this.clientsSubject.next([...clients, client]);
  }
}
