import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { CommonModule } from '@angular/common'; 
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule,} from '@angular/platform-browser/animations'; 
import {ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatTooltipModule } from '@angular/material/tooltip';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(FormsModule, RouterModule,CommonModule,MatTooltipModule, BrowserAnimationsModule, ToastrModule.forRoot({
      positionClass: 'toast-top-left',
      timeOut: 3000,
      progressBar: true,
      progressAnimation: 'decreasing'
    })),
    provideHttpClient(), provideAnimationsAsync(),
  ]
};
