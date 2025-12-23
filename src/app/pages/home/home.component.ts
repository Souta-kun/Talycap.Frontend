import { Component, effect, inject } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CharacterService } from '../../services/character.service';
import { Character } from '../../models/character.model';

export interface UserData {
  id: string;
  name: string;
  progress: string;
  fruit: string;
}

@Component({
  selector: 'app-home',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export default class HomeComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'gender', 'status'];
  dataSource: MatTableDataSource<Character>;
  characterService = inject(CharacterService);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() {
    const characters: Character[] = [];
    this.dataSource = new MatTableDataSource(characters);
    this.characterService.getAllCharacters();
  }
  
  udpateTable = effect(() => {
    this.dataSource.data = this.characterService.characters();
  })


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}