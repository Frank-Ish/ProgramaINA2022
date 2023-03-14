import { Component } from '@angular/core';
import { PersonajesComponent } from '../../personajes.component';
import { InfoModel } from '../../../../shared/models/infoModel';
import { PersonajesService } from '../../../../shared/service/personajes.service';
import { PersonajesCardService } from 'src/app/shared/service/personajes-card.service';
import { PersonajesModule } from '../../personajes.module';
import { PersonajeModel } from 'src/app/shared/models/personajeModel';

@Component({
  selector: 'app-lista-cards',
  templateUrl: './lista-cards.component.html',
  styleUrls: ['./lista-cards.component.css']
})
export class ListaCardsComponent {

  lista: PersonajeModel[]=[];
  info: InfoModel;

  constructor(private personajeSrv: PersonajesService){}
    ngOnInit(): void {
      this.getPersonajes('https://rickandmortyapi.com/api/character');
    }

    next(): void {
      this.getPersonajes(this.info.next);
    }
    preview(): void {
      this.getPersonajes(this.info.prev);
    }

  

  getPersonajes(url: string) {
    this.personajeSrv.getPersonajes(url).subscribe((data: any) => {
  
      const { info, results } = data;
      this.lista = [...this.lista, ...results]
      this.info = info;
      console.log(...results);
    });
  }
}
