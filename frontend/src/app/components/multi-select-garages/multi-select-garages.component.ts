import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GarageService } from '../../services/garage.service';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-multi-select-garages',
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule
  ],
  templateUrl: './multi-select-garages.component.html',
  styleUrl: './multi-select-garages.component.css'
})
export class MultiSelectGaragesComponent implements OnInit{
  //external garages
  externalGarages: any[] = [];
  //user selected garages
  selectedGarages: any[] = [];

  @Output() selectionChange = new EventEmitter<any[]>();
  
  constructor(private garageService:GarageService) {}

  ngOnInit(): void {
    this.loadExternalGarages();
  }

  //TODO add limits and quaris
  loadExternalGarages():void {
    this.garageService.getGlobalGarages().subscribe({
      next: (garages) => {
        this.externalGarages = garages.result.records;
        console.log('External garages fetched:', garages);
      },
      error: (err) => {
        console.error('Error fetching external garages:', err);
      },
    });
  }
  // send the changes
  onSelectionChange(): void {
    this.selectionChange.emit(this.selectedGarages);
  }
  clearSelectedGarages(): void {
    this.selectedGarages = [];
    this.selectionChange.emit(this.selectedGarages); // Notify parent
  }
  

}
