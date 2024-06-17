import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  constructor() {}

  ngOnInit(): void {
    this.randomizeDice();
  }


  randomizeDice(): void {
    const dice1 = document.getElementById('dice1');
    const dice2 = document.getElementById('dice2');

    if (dice1) {
      dice1.style.transform = this.getRandomRotation();
    }

    if (dice2) {
      dice2.style.transform = this.getRandomRotation();
    }
  }

  getRandomRotation(): string {
    const randomX = Math.floor(Math.random() * 4) * 90;
    const randomY = Math.floor(Math.random() * 4) * 90;
    const randomZ = Math.floor(Math.random() * 4) * 90;

    return `rotateX(${randomX}deg) rotateY(${randomY}deg) rotateZ(${randomZ}deg)`;
  }

}
