import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminService } from '../services/admin.service';
import { get } from 'http';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.scss'
})
export class AdminUsersComponent implements OnInit{

  constructor(
    private adminService: AdminService
  ){}

  users: any;
  ngOnInit(): void {
    
    this.getAllUsers();
    
    
  }

  async getAllUsers() {
    try{
      this.users = await this.adminService.getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }

  async deleteUserById(id:number){
    try{
      await this.adminService.deleteUserById(id);
      this.getAllUsers();
    } catch (error) {
      console.log(error);
    }
  }


}
