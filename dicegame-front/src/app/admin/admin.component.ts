import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { AdminService } from '../services/admin.service';
@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    RouterModule, RouterOutlet
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent  {
  data: any;
  
  constructor(private route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  

  
      

}
