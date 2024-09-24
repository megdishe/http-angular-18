import {inject, Injectable, signal} from '@angular/core';

import {Place} from './place.model';
import {HttpClient} from "@angular/common/http";
import {catchError, map, throwError} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class PlacesService {
  private userPlaces = signal<Place[]>([]);
  private isFetching = signal<boolean>(false);
  private error = signal<string|undefined>(undefined);
  private httpClient = inject(HttpClient);

  loadedUserPlaces = this.userPlaces.asReadonly();
  isFetchingReader = this.isFetching.asReadonly();
  errorReader = this.error.asReadonly();


  loadAvailablePlaces() {
    this.isFetching.set(true);
    this.httpClient.get<{ places: Place[] }>('/api/places', {
      //  observe: 'response' return the http response with body and status
    }).pipe(
      map(response => response.places),
      catchError((error) => throwError(() => new Error(error?.error.message)))
    ).subscribe({
        next: (responseData) => this.userPlaces.set(responseData),
        error: (error) => this.error.set(error.message),
        complete: () => this.isFetching.set(false)
      }
    );
  }

  loadUserPlaces() {

  }

  addPlaceToUserPlaces(place
                         :
                         Place
  ) {
  }

  removeUserPlace(place
                    :
                    Place
  ) {
  }
}
