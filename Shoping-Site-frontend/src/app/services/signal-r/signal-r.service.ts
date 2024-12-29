import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../Models/user';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  private hubConnection: HubConnection;
  private userStatusSubject = new BehaviorSubject<any[]>([]);

  constructor() {
    this.hubConnection = new HubConnectionBuilder().withUrl('http://localhost:5181/connectionHub').build();

    this.startConnection();
    this.addListeners();
   }

   private startConnection(): void {
    this.hubConnection.start().catch(err => console.log('Error to start connection', err));
   };
   private addListeners(): void {
    this.hubConnection.on('ReceiveUserStatus', (users: User[]) => {
      this.userStatusSubject.next(users);
    });
   };
  
  public getUsersStatus(): Observable<User[]>{
    return this.userStatusSubject.asObservable();
  };

}
