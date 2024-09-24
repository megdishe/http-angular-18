import {inject, Injectable, signal, WritableSignal} from '@angular/core';

import {Place} from './place.model';
import {HttpClient} from "@angular/common/http";
import {catchError, map, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private availablePlaces = signal<Place[]>([]);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();
  loadedAvailablePlaces = this.availablePlaces.asReadonly();

  loadAvailablePlaces() {
    return this.load('/api/places', 'An error occurred while loading available places', this.availablePlaces);
  }

  loadUserPlaces() {
    return this.load('/api/user-places', 'An error occurred while loading user places', this.userPlaces);
  }

  private load(url: string, message: string, places: WritableSignal<Place[]>) {
    return this.httpClient.get<{ places: Place[] }>(url, {
      //  observe: 'response' return the http response with body and status
    }).pipe(
      map(response => response.places),
      tap(responseData => places.set(responseData)),
      catchError((error) => throwError(() => new Error(error?.error.message)))
    );
  }

  addPlaceToUserPlaces(place: Place) {
    return this.httpClient.put('/api/user-places', {placeId: place.id})
      .pipe(
        tap(
          (responseData) => {
            if (!this.userPlaces().some(value => value.id === place.id)) {
              this.userPlaces.update((previous) => [...previous, place]);
            }
          }),
        catchError((error) => throwError(() => new Error(error?.error.message)))
      );
  }

  removeUserPlace(place: Place) {
    return this.httpClient.delete('/api/user-places/' + place.id)
      .pipe(
        tap((responseData) => {
          console.log('delete');
          console.log(this.userPlaces().length);
          if (this.userPlaces().some(place => place.id === place.id)) {
            this.userPlaces.update((previous) => previous.filter(value => value.id !== place.id));
          }
        }),
        catchError((error) => {
          return throwError(() => new Error(error?.error.message));
        })
      );
  }
}
