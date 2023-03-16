import { DataStorageService } from './../data-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  isLoggedIn = false;
  private user: Subscription;

  constructor(
    private authService: AuthService,
    private dataStorageService: DataStorageService
  ) {}

  ngOnInit() {
    this.user = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
      console.log('menu ->' + this.isLoggedIn);
    });
    this.onFetchData();
  }

  onFetchData() {
    this.dataStorageService.fetchSmoothies().subscribe();
  }

  handleLogout() {
    this.authService.logout();
    this.isLoggedIn = false;
  }

  ngOnDestroy() {
    this.user.unsubscribe();
  }
}
