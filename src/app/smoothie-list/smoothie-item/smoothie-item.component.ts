import { Smoothie } from './../../smoothie.model';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-smoothie-item',
  templateUrl: './smoothie-item.component.html',
  styleUrls: ['./smoothie-item.component.scss'],
})
export class SmoothieItemComponent {
  @Input() smoothie: Smoothie;
  @Input() index: number;
}
