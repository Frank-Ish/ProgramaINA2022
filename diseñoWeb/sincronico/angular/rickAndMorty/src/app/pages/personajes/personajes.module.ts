import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonajesRoutingModule } from './personajes-routing.module';
import { PersonajesComponent } from './personajes.component';
import { MaterialModule } from 'src/app/material.module';
import { ListaCardsComponent } from './lista-cards/lista-cards/lista-cards.component';
import { DetallePersonajeComponent } from './detalle-personaje/detalle-personaje/detalle-personaje.component';

@NgModule({
  declarations: [PersonajesComponent, ListaCardsComponent, DetallePersonajeComponent],
  imports: [CommonModule, PersonajesRoutingModule, MaterialModule],
})
export class PersonajesModule {}