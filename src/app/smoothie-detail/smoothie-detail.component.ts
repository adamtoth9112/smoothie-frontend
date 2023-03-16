import { SmoothiesService } from './../smoothies.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Smoothie } from './../smoothie.model';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-smoothie-detail',
  templateUrl: './smoothie-detail.component.html',
  styleUrls: ['./smoothie-detail.component.scss'],
})
export class SmoothieDetailComponent {
  smoothie: Smoothie;
  id: number;
  private user: Subscription;
  isLoggedIn = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private smoothiesService: SmoothiesService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.smoothie = this.smoothiesService.getSmoothie(this.id);
    });

    this.user = this.authService.user.subscribe((user) => {
      this.isLoggedIn = !!user;
    });
  }

  onEdit() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.smoothiesService.delete(this.id);
    this.router.navigate(['smoothies']);
  }

  ngOnDestroy() {
    this.user.unsubscribe();
  }
}
