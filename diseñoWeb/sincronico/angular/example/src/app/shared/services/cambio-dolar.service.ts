import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cambioDolar } from 'src/app/pages/Models/cambioDolar';

@Injectable({
  providedIn: 'root'
})
export class CambioDolarService {

  constructor(private http: HttpClient) {  }

  //Cuando tengo un llamado que es asincronico, el metodo debe ser Observable
  getCambios(): Observable<cambioDolar>{
    return this.http.get<cambioDolar>('https://api.hacienda.go.cr/indicadores/tc/dolar')
  }
}
