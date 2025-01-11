import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { LoadingService } from './services/loading.service';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon'; // Import MatIconModule
import { MatExpansionModule } from '@angular/material/expansion'; // Import MatExpansionModule
@Component({
  selector: 'app-root',
  //RouterModule for router link in the app.html
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule, 
    MatButtonModule,
    MatExpansionModule, 
    RouterOutlet,
    RouterModule,
    CommonModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

  constructor(public loadingService: LoadingService) {}
}
