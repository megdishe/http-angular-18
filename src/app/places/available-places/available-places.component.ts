import {Component, inject, OnInit} from '@angular/core';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesService} from "../places.service";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;
  isFetching = this.placesService.isFetchingReader;
  error= this.placesService.errorReader;

  ngOnInit(): void {
    this.placesService.loadAvailablePlaces();
  }
}
