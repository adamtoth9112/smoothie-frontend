import { DataStorageService } from './../data-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Smoothie } from './../smoothie.model';
import { SmoothiesService } from './../smoothies.service';
import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-smoothie-list',
  templateUrl: './smoothie-list.component.html',
  styleUrls: ['./smoothie-list.component.scss'],
})
export class SmoothieListComponent {
  smoothies: Smoothie[];
  private subcription: Subscription;
  private user: Subscription;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smoothiesService: SmoothiesService,
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.subcription = this.smoothiesService.smoothiesSubject.subscribe(
      (smoothies: Smoothie[]) => {
        this.smoothies = smoothies;
      }
    );
    this.smoothies = this.smoothiesService.getSmoothies();

    this.user = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
    this.user.unsubscribe();
  }

  onNewSmoothie() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onLogin() {
    this.router.navigate(['login']);
  }

  onSaveData() {
    this.dataStorageService.storeSmoothies();
  }
}
