import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Client {
  CLIENT_ID: string;
  CLIENT_CODE: string;
  NOM: string;
  NOM2: string;
  ADRESSE: string;
  VILLE: string;
  TEL: string;
  GSM: string;
  FAXE: string;
  CONTACT: string;
  MAIL: string;
  LOGO: string;
  IF: string;
  PATENTE: string;
  RC: string;
  CNSS: string;
  SEUIL_CREDIT: string;
  OLD_CREDIT: string;
  CLIENT_CATEGORIE_ID: string;
  INS_USER: string;
  INS_DATE: string;
  UPD_USER: string;
  UPD_DATE: string;
  DEFAUT: string;
  ACTIF: string;
  ICE: string;
  VendorId: string;
  CONTACT_ID: string;
  IS_CONFRERE: string;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clientsSubject = new BehaviorSubject<Client[]>([]);
  clients$ = this.clientsSubject.asObservable();
  private apiUrl = 'http://31.220.89.29/gestcom-api/api/vente/vente_client';

  constructor(private httpClient: HttpClient) {
    this.fetchData();
  }

  private fetchData(): void {
    this.httpClient.get<{ data: Client[] }>(this.apiUrl)
      .subscribe(response => {
        this.clientsSubject.next(response.data);
        console.log(response.data);
      });
  }

  addClient(client: any): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, client);
  }
}
