import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LayoutComponent } from './layout/layout.component'
import { HomeComponent } from './pages/home/home.component'
import { DiceComponent } from './pages/dice/dice.component'
import { AlchemyComponent } from './pages/alchemy/alchemy.component'
import { MaterialModule } from './shared/material.module';
import { DiceFactComponent } from './pages/dice/dice-fact/dice-fact.component'

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    HomeComponent,
    DiceComponent,
    AlchemyComponent,
    DiceFactComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
