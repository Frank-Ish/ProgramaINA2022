import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { PersonajesService } from '../../../../shared/service/personajes.service';
import { PersonajeModel } from '../../../../shared/models/personajeModel';

@Component({
  selector: 'app-detalle-personaje',
  templateUrl: './detalle-personaje.component.html',
  styleUrls: ['./detalle-personaje.component.css']
})
export class DetallePersonajeComponent implements OnInit {

  personaje : PersonajeModel;

  constructor(route: ActivatedRoute, srv: PersonajesService ){
    const id: route.snapshot.paramMap.get('id');

    srv.getPersonajesById(id).subscribe((per:any) =>{
      this.personaje = result;

      console.log(this.personaje);
    })
  }

  ngOnInit(): void {
    
  }
}
