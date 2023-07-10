import { DatePipe, JsonPipe, NgClass, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { injectBookingFeature } from '../../../+state/booking.state';
import { CardComponent } from '../../ui/card.component';
import { Flight } from './../../logic/model/flight';


@Component({
  selector: 'app-flight-search',
  standalone: true,
  imports: [
    NgIf, NgFor, DatePipe, JsonPipe, NgTemplateOutlet, NgClass,
    RouterLink,
    FormsModule,
    CardComponent
  ],
  templateUrl: './search.component.html'
})
export class SearchComponent {
  bookingFeature = injectBookingFeature();

  from = signal('Paris');
  to = signal('London');
  basket = signal<Record<number, boolean>>({
    3: true,
    5: true,
  });
  flights = this.bookingFeature.flights;
  flightRoute = computed(
    () => `Flight from ${ this.from() } to ${ this.to() }.`
  );
  flightsCount = computed(() => this.bookingFeature.flights().length);
  hasToManyFlights = computed(() => this.flightsCount() > 100);
  tooManyWarning = computed(() =>
    this.hasToManyFlights() ?
      'Too many flights were found. Please change your search filter.' :
      `${ this.flightsCount() } flights found.`
  );

  constructor() {
    effect(() => console.log(
      this.from(), this.to(), this.flightRoute()
    ));

    setTimeout(
      () => this.from.set('Berlin')
    , 5_000);
  }

  flightTrackBy(index: number, flight: Flight) {
    return flight.id;
  }

  updateBasket(id: number, selected: boolean): void {
    this.basket.mutate(
      basket => { basket[id] = selected; }
    );
  }
}
