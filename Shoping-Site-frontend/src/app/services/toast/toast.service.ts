import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastr: ToastrService) { }

  success(massage: string, title?: string): void {
    console.log(massage);
    
    this.toastr.success(massage, title);
  };
  error(massage: string, title?: string): void {
    this.toastr.error(massage, title);
  }
  warning(massage: string, title?: string): void {
    this.toastr.warning(massage, title);
  }
  info(massage: string, title?: string): void {
    this.toastr.info(massage, title);
  }
}
