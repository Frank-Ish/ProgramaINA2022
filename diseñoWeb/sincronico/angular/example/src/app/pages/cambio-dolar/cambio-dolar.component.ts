import { Component, OnInit } from '@angular/core';
import { CambioDolarService } from '../../shared/services/cambio-dolar.service';
import { cambioDolar } from 'src/app/pages/Models/cambioDolar';

@Component({
  selector: 'app-cambio-dolar',
  templateUrl: './cambio-dolar.component.html',
  styleUrls: ['./cambio-dolar.component.css']
})
export class CambioDolarComponent implements OnInit{

  datoCambio : cambioDolar;
  constructor(private cambioDolarSrv:CambioDolarService){
    //Como getCambios retorna un Oserbable, debo llamar el metodo subscribe.
    this.cambioDolarSrv.getCambios().subscribe((data:cambioDolar) =>{
      this.datoCambio = data;
      console.log(this.datoCambio);
    });
  }

  ngOnInit(): void {
    
  }
}
