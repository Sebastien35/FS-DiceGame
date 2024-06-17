import { Component } from '@angular/core';
import { User } from '../models/user/user';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-connect',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './connect.component.html',
  styleUrl: './connect.component.scss'
})
export class ConnectComponent {
  user: User;
  

  constructor(
     private router: Router,
      private userService:UserServiceService
    ) {
    this.user = new User(0, '', '', '');
    
  }

  onSubmit(){
    console.log(this.user);
    if(this.user.username === '' || this.user.password === ''){
      alert("Please enter a username and password");
      return;
    }
    this.userService.connect(this.user).subscribe(()=>this.gotoGame());
    
  }

  gotoGame() {
    this.router.navigate(['/game']);
  }


}
