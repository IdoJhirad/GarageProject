import { Component, OnInit, ViewChild } from '@angular/core';
import { SavedGaragesComponent } from '../../components/saved-garages/saved-garages.component';
import { MultiSelectGaragesComponent } from '../../components/multi-select-garages/multi-select-garages.component';
import { GarageService } from '../../services/garage.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-dashboard',
  imports: [SavedGaragesComponent, MultiSelectGaragesComponent, MatIconModule,MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{
  selectedGlobalGarages: any[] = [];
  savedGarages: any[] = [];
  userName: string | null = null;
  constructor(private garageService: GarageService, private authService: AuthService){}

  @ViewChild(MultiSelectGaragesComponent) multiSelectGaragesComponent!: MultiSelectGaragesComponent;  


  ngOnInit(): void {
    this.loadSavedGarages();
    this.userName = localStorage.getItem('userName')
    }

  //load saved garages for the saved garages
  loadSavedGarages():void  {
    this.garageService.getSavedGarages().subscribe({
      next: (response) => {
        // Extract the 'savedGarages' array
        this.savedGarages = response.savedGarages;
      },
      error: (err) => {
        console.error('Error fetching garages:', err);
      },
    });
  }

  //handle garage selection from multy select
  onGlobalGaragesSelected(selected: any[]): void {
    this.selectedGlobalGarages = selected;
    console.log('Selected garages:', this.selectedGlobalGarages);
  }

  addSelectedGarages():void {
    if(this.selectedGlobalGarages.length > 0) {
      this.garageService.addGarages(this.selectedGlobalGarages).subscribe({
        next: () => {
          console.log('Garages added successfully!');
          this.selectedGlobalGarages = [];
          this.loadSavedGarages();
          // Reset the multi-select dropdown
          this.multiSelectGaragesComponent.clearSelectedGarages();
        
        },
        error: (err: any) => {
          console.error('Error adding garages:', err);
        },
      })
    }
  }
  logout(): void {
    this.authService.logOut();
  }
}
