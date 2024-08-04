import { Component, OnInit,inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClient,HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit {
  HttpClient=inject(HttpClient)
  
data:any[]=[]
  ngOnInit(): void {
    this.fetchData()
  }

  fetchData(){
this.HttpClient.get('http://31.220.89.29/gestcom-api/api/vente/vente_client').subscribe((data:any)=>{
  console.log(data);
})    
  }
}
