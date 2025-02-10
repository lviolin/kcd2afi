import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LayoutComponent } from './layout/layout.component'
import { HomeComponent } from './pages/home/home.component'
import { DiceComponent } from './pages/dice/dice.component'
import { AlchemyComponent } from './pages/alchemy/alchemy.component'

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'home',
        component: HomeComponent,
      },
      { path: 'dice', redirectTo: 'dice/', pathMatch: 'full' },
      {
        path: 'dice/:s',
        component: DiceComponent,
      },
      {
        path: 'alchemy',
        component: AlchemyComponent,
      },
    ],
  },
  { path: '**', redirectTo: '' },
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      onSameUrlNavigation: 'reload',
      useHash: true,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
