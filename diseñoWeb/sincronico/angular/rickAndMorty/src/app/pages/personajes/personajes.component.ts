import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { PersonajesService } from 'src/app/shared/service/personajes.service'
import { MatPaginator } from '@angular/material/paginator';
import { InfoModel } from 'src/app/shared/models/infoModel';
import { PersonajesCardService } from 'src/app/shared/service/personajes-card.service';

@Component({
  selector: 'app-personajes',
  templateUrl: './personajes.component.html',
  styleUrls: ['./personajes.component.css'],
})
export class PersonajesComponent implements OnInit, AfterViewInit {
  // lista:CharacterModel[]=[]

  info: InfoModel;
  displayedColumns: string[] = [
    'id',
    'name',
    'status',
    'species',
    'gender',
    'image',
    'created',
  ];
  dataSource = [];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private personjesSrv: PersonajesCardService) {}

  getPersonajes(url: string) {
    this.personjesSrv.getPersonajes(url).subscribe((data: any) => {
      // console.log(data)
      const { info, results } = data;
      this.dataSource = results;
      this.info = info;
      // this.lista=[...this.lista,results]
      console.log(this.dataSource);
    });
  }

  ngOnInit(): void {
    this.getPersonajes('https://rickandmortyapi.com/api/character');
  }

  next(): void {
    this.getPersonajes(this.info.next);
  }
  preview(): void {
    this.getPersonajes(this.info.prev);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }
}
