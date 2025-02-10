import { Component, ViewChild } from '@angular/core'
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table'
import { ActivatedRoute, Route, Router } from '@angular/router'
import { die } from 'src/app/models/die'

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent {
  @ViewChild(MatSort) sort = new MatSort()

  allDice: die[] = []
  diceSet: die[] = []
  setId = ''

  setFacts: Map<string, number> = new Map()

  dataSource!: MatTableDataSource<die>

  cols = [
    'act',
    'name',
    'w1Perc',
    'w2Perc',
    'w3Perc',
    'w4Perc',
    'w5Perc',
    'w6Perc',
  ]

  constructor(private route: ActivatedRoute, private router: Router) {
    this.initDice()
    //this.loadSet('E9E9E9E9E9E9')
    //this.loadSet('EEEEEEEEDFFF')
    //this.loadSet('FFFFFFFFFFEB')

    console.warn('HERE')
  }

  ngOnInit() {
    console.warn('getting params')
    this.route.params.subscribe((params) => {
      console.warn(params)
      if (params['s']) {
        this.loadSet(params['s'])
      } else {
        this.loadSet('E9E9E9E9E9E9')
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
  }

  public addDieToSet(dieId: string) {
    if (this.diceSet.length > 5) {
      window.alert('Set is full. Please remove a die first.')
      return
    }

    const newSetId = `${this.diceSet.map((_) => _.id).join('')}${dieId}`
    this.router.navigate(['/dice', newSetId])
  }

  public removeDieFromSet(dieId: string) {
    for (let i = 0; i < this.diceSet.length; i++) {
      if (this.diceSet[i].id == dieId) {
        this.diceSet.splice(i, 1)
        break
      }
    }

    const newSetId = this.diceSet.map((_) => _.id).join('')
    this.router.navigate(['/dice', newSetId])
  }

  private loadSet(newSetId: string) {
    this.setId = newSetId
    this.diceSet = []

    let temp = this.setId
    while (temp.length > 1) {
      const dieId = temp.substring(0, 2)
      const toAdd = this.allDice.find((_) => _.id == dieId)
      if (toAdd == undefined) {
        //TODO errors
        this.diceSet = []
        return
      }
      this.diceSet.push(toAdd)
      temp = temp.substring(2)
    }

    this.calcSetFacts()
  }

  private calcSetFacts() {
    this.setFacts = new Map()

    let probs = this.diceSet.map((_) => _.w1Perc / 100)
    this.setFacts.set('1+ 1s', this.probAtLeastX(probs, 1))
    this.setFacts.set('1+ 1s', this.probAtLeastX(probs, 2))
    this.setFacts.set('3+ 1s', this.probAtLeastX(probs, 3))
    this.setFacts.set('4+ 1s', this.probAtLeastX(probs, 4))
    this.setFacts.set('5+ 1s', this.probAtLeastX(probs, 5))
    this.setFacts.set('6 1s', this.probAtLeastX(probs, 6))

    probs = this.diceSet.map((_) => _.w3Perc / 100)
    this.setFacts.set('3+ 3s', this.probAtLeastX(probs, 3))
    this.setFacts.set('4+ 3s', this.probAtLeastX(probs, 4))
    this.setFacts.set('5+ 3s', this.probAtLeastX(probs, 5))
    this.setFacts.set('6 3s', this.probAtLeastX(probs, 6))

    probs = this.diceSet.map((_) => _.w5Perc / 100)
    this.setFacts.set('1+ 5s', this.probAtLeastX(probs, 1))
    this.setFacts.set('1+ 5s', this.probAtLeastX(probs, 2))
    this.setFacts.set('3+ 5s', this.probAtLeastX(probs, 3))
    this.setFacts.set('4+ 5s', this.probAtLeastX(probs, 4))
    this.setFacts.set('5+ 5s', this.probAtLeastX(probs, 5))
    this.setFacts.set('6 5s', this.probAtLeastX(probs, 6))

    probs = this.diceSet.map((_) => _.w6Perc / 100)
    this.setFacts.set('3+ 6s', this.probAtLeastX(probs, 3))
    this.setFacts.set('4+ 6s', this.probAtLeastX(probs, 4))
    this.setFacts.set('5+ 6s', this.probAtLeastX(probs, 5))
    this.setFacts.set('6 6s', this.probAtLeastX(probs, 6))
  }

  private initDice() {
    this.allDice.push(new die('B9', "Aranka's die", 6, 1, 6, 1, 6, 1))
    this.allDice.push(new die('BA', "Cautious cheater's die", 5, 3, 2, 3, 5, 3))
    this.allDice.push(new die('BB', 'Ci die', 3, 3, 3, 3, 3, 8))
    this.allDice.push(new die('BC', "Devil's head die", 1, 1, 1, 1, 1, 1))
    this.allDice.push(new die('BD', 'Die of misfortune', 1, 5, 5, 5, 5, 1))
    this.allDice.push(new die('BE', 'Even die', 2, 8, 2, 8, 2, 8))
    this.allDice.push(new die('BF', 'Favourable die', 6, 0, 1, 1, 6, 4))
    this.allDice.push(new die('C9', 'Fer die', 3, 3, 3, 3, 3, 8))
    this.allDice.push(new die('CA', 'Greasy die', 3, 2, 3, 2, 3, 4))
    this.allDice.push(new die('CB', 'Grimy die', 1, 5, 1, 1, 7, 1))
    this.allDice.push(new die('CC', "Grozav's lucky die", 1, 10, 1, 1, 1, 1))
    this.allDice.push(new die('CD', 'Heavenly Kingdom die', 7, 2, 2, 2, 2, 4))
    this.allDice.push(new die('CE', 'Holy Trinity die', 4, 5, 10, 1, 1, 1))
    this.allDice.push(new die('CF', "Hugo's Die", 1, 1, 1, 1, 1, 1))
    this.allDice.push(new die('D9', "King's die", 4, 6, 7, 8, 4, 3))
    this.allDice.push(new die('DA', "Lousy gambler's die", 2, 3, 2, 3, 7, 3))
    this.allDice.push(new die('DB', 'Lu die', 3, 3, 3, 3, 3, 8))
    this.allDice.push(new die('DC', 'Lucky Die', 6, 1, 2, 3, 4, 6))
    this.allDice.push(new die('DD', "Mathematician's Die", 4, 5, 6, 7, 1, 1))
    this.allDice.push(new die('DE', 'Molar die', 1, 1, 1, 1, 1, 1))
    this.allDice.push(new die('DF', 'Odd die', 8, 2, 8, 2, 8, 2))
    this.allDice.push(new die('E9', 'Ordinary die', 1, 1, 1, 1, 1, 1))
    this.allDice.push(new die('EA', 'Painted die', 3, 1, 1, 1, 7, 3))
    this.allDice.push(new die('EB', 'Pie die', 6, 1, 3, 3, 0, 0))
    this.allDice.push(new die('EC', 'Premolar die', 1, 1, 1, 1, 1, 1))
    this.allDice.push(new die('ED', "Sad Greaser's Die", 6, 6, 1, 1, 6, 3))
    this.allDice.push(new die('EE', "Saint Antiochus' die", 0, 0, 9, 0, 0, 0))
    this.allDice.push(new die('EF', 'Shrinking die', 2, 1, 1, 1, 1, 3))
    this.allDice.push(new die('F9', "St. Stephen's die", 1, 1, 1, 1, 1, 1))
    this.allDice.push(new die('FA', 'Strip die', 4, 2, 2, 2, 3, 3))
    this.allDice.push(new die('FB', 'Three die', 2, 1, 9, 1, 2, 1))
    this.allDice.push(new die('FC', 'Unbalanced Die', 3, 4, 1, 1, 2, 1))
    this.allDice.push(new die('FD', 'Unlucky die', 1, 3, 2, 2, 2, 1))
    this.allDice.push(new die('FE', "Wagoner's Die", 1, 5, 6, 2, 2, 2))
    this.allDice.push(new die('FF', 'Weighted die', 10, 1, 1, 1, 1, 1))
    this.allDice.push(new die('A9', 'Wisdom tooth die', 1, 1, 1, 1, 1, 1))
    this.dataSource = new MatTableDataSource<die>(this.allDice)
  }

  private probAtLeastX(eventProbs: number[], X: number) {
    const n = eventProbs.length
    let totalProb = 0

    for (let mask = 0; mask < 1 << n; mask++) {
      let successCount = 0
      for (let i = 0; i < n; i++) {
        if (mask & (1 << i)) {
          successCount++
        }
      }

      if (successCount >= X) {
        totalProb += this.probOfCombination(mask, n, eventProbs)
      }
    }

    return totalProb
  }

  private probOfCombination(
    mask: number,
    n: number,
    eventProbs: number[]
  ): number {
    let prob = 1
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) {
        prob *= eventProbs[i]
      } else {
        prob *= 1 - eventProbs[i]
      }
    }
    return prob
  }
}
