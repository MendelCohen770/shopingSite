import { Component, OnInit } from '@angular/core';
import { SignalRService } from '../services/signal-r/signal-r.service';
import { CommonModule } from '@angular/common';
import { User } from '../Models/user';
import { ApiService } from '../services/api/api.service';


@Component({
  selector: 'app-users-status',
  imports: [CommonModule],
  templateUrl: './users-status.component.html',
  styleUrl: './users-status.component.scss'
})
export class UsersStatusComponent implements OnInit {

  usersStatus: User[] = [];

  constructor(private signalRService: SignalRService, private apiService: ApiService) { }

  ngOnInit(): void {

    this.apiService.getAllUsers().subscribe(users => {
      this.usersStatus = users;
    });
    this.signalRService.getUsersStatus().subscribe((users) => {
      this.usersStatus = this.usersStatus.map<User>((user) => {
        const updatedUser = users.find(u => u.username === user.username)
        if (updatedUser) {
          return { ...user, isConnected: updatedUser.isConnected };
        } else {
          return { ...user, isConnected: false };
        }
      })
    });
  };
  getStatusClass(isConnected: boolean): string {
    return isConnected ? 'connected' : 'disconnected';
  }
}
