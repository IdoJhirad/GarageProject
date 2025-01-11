import { Component } from '@angular/core';
import { RouterModule,RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  //RouterModule for router link in the app.html
  imports: [RouterOutlet,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
