import { effect, inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  API: string = environment.URL_API;
  http = inject(HttpClient);

  getAllCharacters = effect(() => {
    return this.http.get<any>(`${this.API}`);
  });
}
