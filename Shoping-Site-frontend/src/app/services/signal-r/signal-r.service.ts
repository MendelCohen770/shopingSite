import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role, User } from '../../Models/user';
import { ToastService } from '../toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection;
  private userStatusSubject = new BehaviorSubject<any[]>([]);

  constructor(private toastService: ToastService) {
    this.hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5181/connectionHub').withAutomaticReconnect().build();

    this.addListeners();

   }

   public startConnection(): void {
    this.hubConnection
      .start()
      .then()
      .catch(err => {
        this.toastService.error('Failed to start SignalR connection.');
        console.error(err);
      });
  }

  public stopConnection(): void {
    this.hubConnection
      .stop()
      .then()
      .catch(err => {
        this.toastService.error('Failed to stop SignalR connection.');
        console.log(err);
      });
  }

  private addListeners(): void {
    this.hubConnection.on('ReceiveUserStatus', (users: User[]) => {
      this.userStatusSubject.next(users);
    });

  
    this.hubConnection.on('ReceiveAdminNotification', (message: string) => {
      const userString = localStorage.getItem('user');
      if (userString) {
        const user = JSON.parse(userString);
        if (user.role === Role.admin) {
          this.toastService.info(message);
        }
      }
    });
  }

  public getUsersStatus(): Observable<User[]> {
    return this.userStatusSubject.asObservable();
  }

}
