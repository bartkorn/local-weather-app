import { Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'

import { ICurrentWeather } from '../interfaces'
import { WeatherService } from '../weather/weather.service'

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.css'],
})
export class CurrentWeatherComponent implements OnInit {
  current$: Observable<ICurrentWeather>

  constructor(private weatherService: WeatherService) {
    this.current$ = weatherService.currentWeather$
  }

  ngOnInit(): void {}

  getOrdinal(date: number): string {
    const n = new Date(date).getDate()
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : ''
  }
}
