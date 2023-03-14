
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'personajes',
    loadChildren: () =>import('./pages/personajes/personajes.module').then((m) => m.PersonajesModule),
  },
  {
    path: 'location',
    loadChildren: () =>import('./pages/location/location.module').then((m) => m.LocationModule),
  },
  {
    path: 'location',
    loadChildren: () =>import('./pages/location/location.module').then((m) => m.LocationModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}