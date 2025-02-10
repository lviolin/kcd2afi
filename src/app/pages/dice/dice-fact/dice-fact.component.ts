import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-dice-fact',
  templateUrl: './dice-fact.component.html',
  styleUrls: ['./dice-fact.component.scss'],
})
export class DiceFactComponent {
  @Input() label = ''
  @Input() prob = 0
}
