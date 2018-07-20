import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SnakeComponent } from './pages/snake/snake.component';
import { LorenzAttractorComponent } from './pages/lorenz-attractor';
import { PerlinNoiseComponent } from './pages/perlin-noise';

const ROUTES: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'snake',
    component: SnakeComponent
  },
  {
    path: 'lorenz-attractor',
    component: LorenzAttractorComponent
  },
  {
    path: 'perlin-noise',
    component: PerlinNoiseComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SnakeComponent,
    LorenzAttractorComponent,
    PerlinNoiseComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
