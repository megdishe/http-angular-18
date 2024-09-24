import {Component, inject, OnInit} from '@angular/core';
import {PlacesComponent} from '../places.component';
import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesService} from "../places.service";
import {Place} from "../place.model";
import {ErrorService} from "../../shared/error.service";
import {SpinnerService} from "../../shared/spinner/spinner.service";
import {SpinnerComponent} from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  providers:[SpinnerService],
  imports: [PlacesComponent, PlacesContainerComponent, SpinnerComponent]
})
export class AvailablePlacesComponent implements OnInit {

  private placesService = inject(PlacesService);
  places = this.placesService.loadedAvailablePlaces;
  private errorService = inject(ErrorService);
  private spinnerService = inject(SpinnerService);
  showSpinner = this.spinnerService.show;

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.placesService.loadAvailablePlaces()
      .subscribe({
        error: (error) => this.errorService.showError(error.message),
        complete: () => this.spinnerService.hideSpinner()
      });
  }

  onSelectPlace(place: Place) {
    this.placesService.addPlaceToUserPlaces(place).subscribe({
      error: (error) => this.errorService.showError(error.message)
    });
  }
}
