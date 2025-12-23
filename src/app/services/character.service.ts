import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { Character, CharacterResponse } from '../models/character.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  API: string = environment.URL_API;
  http = inject(HttpClient);
  characters = signal<Character[]>([]);

  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, { duration: 1500 });
  }

  getAllCharacters() {
    this.http
      .get<CharacterResponse>(`${this.API}`)
      .pipe(
        map((resp) =>
          resp.results.map((c) => ({
            id: c.id,
            name: c.name,
            gender: c.gender,
            status: c.status,
          }))
        ),
        tap((resp) => this.characters.set(resp ?? [])),
        catchError((err) => {
          alert('Error consultando characters');
          this.openSnackBar('Error consultando Personajes', 'Cerrar');
          return throwError(err.message);
        })
      )
      .subscribe({
        next: () => {
          this.openSnackBar('Personajes cargados', 'Cerrar');
        },
      });
  }
}
