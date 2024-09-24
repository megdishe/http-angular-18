import {Component, inject} from '@angular/core';

import {PlacesContainerComponent} from '../places-container/places-container.component';
import {PlacesComponent} from '../places.component';
import {PlacesService} from "../places.service";
import {Place} from "../place.model";
import {ErrorService} from "../../shared/error.service";
import {SpinnerService} from "../../shared/spinner/spinner.service";
import {SpinnerComponent} from "../../shared/spinner/spinner.component";

@Component({
  selector: 'app-user-places',
  standalone: true,
  providers:[SpinnerService],
  templateUrl: './user-places.component.html',
  styleUrl: './user-places.component.css',
  imports: [PlacesContainerComponent, PlacesComponent, SpinnerComponent],
})
export class UserPlacesComponent {
  private placesService = inject(PlacesService);
  places = this.placesService.loadedUserPlaces;
  private errorService = inject(ErrorService);
  private spinnerService = inject(SpinnerService);
  showSpinner = this.spinnerService.show;

  ngOnInit(): void {
    this.spinnerService.showSpinner();
    this.placesService.loadUserPlaces()
      .subscribe({
        error: (error) => this.errorService.showError(error.message),
        complete: () => this.spinnerService.hideSpinner()
      });
  }

  onSelectPlace(place: Place) {
    this.placesService.removeUserPlace(place).subscribe({
      error: (error) => this.errorService.showError(error.message)
    })
  }
}
