import { Component } from '@angular/core';
import { User } from '../models/user/user';
import { UserServiceService } from '../services/user-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ 
    FormsModule,
    
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: User


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserServiceService,

  
  ){
      this.user = new User(0, '', '', '');
  }



  onSubmit() {
      if(this.user.password !== this.user.confirmPassword) {
          alert("Passwords do not match");
          return;
      }
      this.userService.save(this.user).subscribe(result=>this.gotoLogin());
  }

  gotoLogin() {
      this.router.navigate(['/connect']);
  }


}
