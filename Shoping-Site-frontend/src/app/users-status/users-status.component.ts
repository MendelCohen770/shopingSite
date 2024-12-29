import { Component } from '@angular/core';
import { SignalRService } from '../services/signal-r/signal-r.service';
import { CommonModule } from '@angular/common';
import { User } from '../Models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-users-status',
  imports: [CommonModule],
  templateUrl: './users-status.component.html',
  styleUrl: './users-status.component.scss'
})
export class UsersStatusComponent {
 
  usersStatus: User[] = [];

  constructor(private signalRService: SignalRService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    const usersResolver = this.route.snapshot.data['allUsersResolver'];
    if(usersResolver){
      this.usersStatus = usersResolver; 
    }
    this.signalRService.getUsersStatus().subscribe( (users) => {
      this.usersStatus = this.usersStatus.map<User>( (user) => {
        const updatedUser = users.find(u => u.username === user.username)
        if (updatedUser) {
          return { ...user, isConnected: updatedUser.isConnected };
        }
        return user; 
      })      
    })
    
  }
  getStatusClass(isConnected: boolean): string{
    return isConnected ? 'connected' : 'disconnected';
  }
}
