import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { GlobalVariablesService } from '../../globals';
import AOS from 'aos';

@Component({
  selector: 'app-home-component',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('2000ms', style({ opacity: 0.65 }))
        ]),
        transition(':leave', [
          style({ opacity: 0.65 }),
          animate('2000ms', style({ opacity: 0 }))
        ])
      ]
    )
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  public ngOnInit(): void {
    AOS.init({
      disable: 'phone',
      duration: 1000,
      offset: 1333,
      once: false,
      anchorPlacement: 'top-bottom'
    });
  }

  public stopPerlinNoise(): void {
    GlobalVariablesService.nextPageClicked = true;
  }
}
