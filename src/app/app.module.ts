import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { SnakeComponent } from './pages/snake/snake.component';
import { LorenzAttractorComponent } from './pages/lorenz-attractor';
import { PerlinNoiseComponent } from './pages/perlin-noise';
import { TensorFlowTestComponent } from './pages/tensorflow-test';
import { GlobalVariablesService } from './globals';

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
    path: 'tensorflow-test',
    component: TensorFlowTestComponent
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
    PerlinNoiseComponent,
    TensorFlowTestComponent
  ],
  imports: [
    RouterModule.forRoot(ROUTES),
    BrowserModule,
    BrowserAnimationsModule,
    ScrollToModule.forRoot()
  ],
  providers: [GlobalVariablesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
