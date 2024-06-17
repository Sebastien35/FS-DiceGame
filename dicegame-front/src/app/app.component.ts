import { ApplicationConfig, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GameComponent } from './game/game.component';
import { GameOverComponent } from './game-over/game-over.component';
import { ConnectComponent } from './connect/connect.component';
import { RegisterComponent } from './register/register.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { UserServiceService } from './services/user-service.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,  
    GameComponent,
    GameOverComponent,
    ConnectComponent,
    RegisterComponent,
    HttpClientModule,
    RouterModule,
    CommonModule,


  

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent implements OnInit {
  title = 'dicegame';
  isUserAdmin: boolean = false;
  connected: boolean = false;
  
  
  constructor(
    private userService: UserServiceService,
    
  ){
    
    
  }
  ngOnInit(): void {
    this.connected  = this.userService.isUserAuthenticated();

    this.isUserAdmin = this.userService.isAdmin();

  }

  public logout(){
    this.userService.logout();
    window.location.replace('/');
  }

  public isUserAuthenticated(){
    if(this.userService.isUserAuthenticated()){
      return true;
    }
    return false;
  }

  public isAdmin(){
    this.isUserAdmin = this.userService.isAdmin();

  }

  
  closeCollapse(){
    const navbarNav = document.getElementById('navbarNav');
    if(navbarNav){
      navbarNav.classList.remove('show');
    }
  }

  
 

}

      


    


