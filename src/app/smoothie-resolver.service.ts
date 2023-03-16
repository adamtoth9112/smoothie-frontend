import { SmoothiesService } from './smoothies.service';
import { DataStorageService } from './data-storage.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Smoothie } from './smoothie.model';

@Injectable({
  providedIn: 'root',
})
export class SmoothieResolverService implements Resolve<Smoothie[]> {
  constructor(
    private dataStorageService: DataStorageService,
    private smoothiesService: SmoothiesService
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const smoothies = this.smoothiesService.getSmoothies();
    if (smoothies.length === 0) {
      return this.dataStorageService.fetchSmoothies();
    } else {
      return smoothies;
    }
  }
}
