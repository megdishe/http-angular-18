import {signal} from "@angular/core";

export class SpinnerService {
  private show$ = signal<boolean>(false);
  show = this.show$.asReadonly();

  showSpinner(): void {
    this.show$.set(true)
  }

  hideSpinner(): void {
    this.show$.set(false)
  }
}
