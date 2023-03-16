import { Smoothie } from './smoothie.model';
import { Injectable } from '@angular/core';
import { Ingredient } from './ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SmoothiesService {
  private smoothies: Smoothie[] = [];

  smoothiesSubject = new Subject<Smoothie[]>();

  constructor() {}

  setSmoothies(smoothies: Smoothie[]) {
    this.smoothies = smoothies;
    this.smoothiesSubject.next(this.smoothies.slice());
  }

  getSmoothies() {
    return this.smoothies.slice();
  }

  getSmoothie(id: number): Smoothie {
    return this.smoothies[id];
  }

  updateSmoothie(id: number, newSmoothie: Smoothie) {
    this.smoothies[id] = newSmoothie;
    this.smoothiesSubject.next(this.smoothies.slice());
  }

  addSmoothie(smoothie: Smoothie) {
    this.smoothies.push(smoothie);
    this.smoothiesSubject.next(this.smoothies.slice());
  }

  delete(id: number) {
    this.smoothies.splice(id, 1);
    this.smoothiesSubject.next(this.smoothies.slice());
  }
}
