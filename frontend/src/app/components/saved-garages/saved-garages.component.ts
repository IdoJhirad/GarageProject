import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';import { MatTableDataSource } from '@angular/material/table';
import { GarageService } from '../../services/garage.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-saved-garages',
  imports: [CommonModule],
  templateUrl: './saved-garages.component.html',
  styleUrl: './saved-garages.component.css'
})
export class SavedGaragesComponent implements OnChanges{
  @Input() savedGarages: any[] = [];

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['savedGarages']) {
      console.log('Saved garages updated:', this.savedGarages);
    }
  }  
}
