import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-error',
  standalone: true,
  imports: [
    RouterModule
  ],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ){}

  errorCode: any;
  url: String = '';
  errorMessage: string = '';
  errorDescription: string = '';

  ngOnInit(): void {
    this.url = this.router.url;
    this.errorCode=this.url.slice(-4).replace('=','');
    this.chooseTemplate(this.errorCode);
  }

  chooseTemplate(error: string){
    switch(error){
      case '403':
        this.errorMessage = 'Forbidden';
        this.errorDescription = 'You do not have permission to access this page';
        break;
      case '404':
        this.errorMessage = 'Page not found';
        this.errorDescription = 'The page you are looking for does not exist or has been removed';
        break;
      case '500':
        this.errorMessage = 'Internal server error';
        this.errorDescription = 'An error occurred while processing your request';
        break;
      default:
        this.errorMessage = 'An error occurred';
    }
  }

  

  


  

}
