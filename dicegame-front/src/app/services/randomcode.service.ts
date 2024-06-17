import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RandomCodeService {

  constructor() { }

  generateRandomCode(): string {
    return Array(2).fill(0).map(() => Math.random().toString(36).substring(2, 15)).join('').substring(0, 16);
  }

  
}


