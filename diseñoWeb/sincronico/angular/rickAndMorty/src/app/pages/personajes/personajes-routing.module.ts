import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonajesComponent } from './personajes.component';
import { DetallePersonajeComponent } from './detalle-personaje/detalle-personaje/detalle-personaje.component';
import { ListaCardsComponent } from './lista-cards/lista-cards/lista-cards.component';

const routes: Routes = [
  { path: '',
    component: PersonajesComponent 
  },
  { path: 'lista', 
    component: PersonajesComponent
  },
  {
    path: 'listaCards',
    component: ListaCardsComponent
  },
  { path: 'detalle/:id',
    component: DetallePersonajeComponent 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonajesRoutingModule {}