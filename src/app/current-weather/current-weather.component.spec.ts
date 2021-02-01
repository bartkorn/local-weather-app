import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

import { MaterialModule } from '../material.module'
import { WeatherService } from '../weather/weather.service'
import { WeatherServiceFake } from '../weather/weather.service.fake'
import { CurrentWeatherComponent } from './current-weather.component'

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent
  let fixture: ComponentFixture<CurrentWeatherComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MaterialModule],
      declarations: [CurrentWeatherComponent],
      providers: [
        {
          provide: WeatherService,
          useClass: WeatherServiceFake,
        },
      ],
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent)
    component = fixture.componentInstance
    // fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should eagerly load currentWeather in Bethesda from weatherService', () => {
    // Act
    fixture.detectChanges()
    // Assert
    expect(component.current$).toBeDefined()
    // Assert
    component.current$.subscribe((data) => {
      expect(data.city).toEqual('Bethesda')
      expect(data.temperature).toEqual(280.32)
    })
    // Assert on DOM
    const debugEl = fixture.debugElement
    const titleEl: HTMLElement = debugEl.query(By.css('.mat-title')).nativeElement
    expect(titleEl.textContent).toContain('Bethesda')
  })

  it('should get correct value of ordinal', () => {
    // TBD
  })
})
