import { Smoothie } from './smoothie.model';
import { SmoothiesService } from './smoothies.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private smoothiesService: SmoothiesService,
    private authService: AuthService
  ) {}

  fetchSmoothies() {
    return this.http
      .get<Smoothie[]>('http://localhost:8080/api/v1/smoothies')
      .pipe(
        map((smoothies) => {
          return smoothies.map((smoothie) => {
            return {
              ...smoothie,
              ingredients: smoothie.ingredients ? smoothie.ingredients : [],
            };
          });
        }),
        tap((smoothies) => {
          this.smoothiesService.setSmoothies(smoothies);
        })
      );
  }

  storeSmoothies() {
    const smoothies = this.smoothiesService.getSmoothies();
    console.log(smoothies);
    this.http
      .put('http://localhost:8080/api/v1/smoothies', smoothies)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
