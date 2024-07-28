import { Component } from '@angular/core';
import { BackendServiceService } from './backend-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ttsDashbored';
  constructor(public back:BackendServiceService){

  }
}
