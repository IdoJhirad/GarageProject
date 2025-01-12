import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';import { MatTableDataSource } from '@angular/material/table';
import { GarageService } from '../../services/garage.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-saved-garages',
  imports: [ CommonModule, 
    MatTableModule, // Table module for mat-table
    MatButtonModule, // For mat-icon-button
  ],
  templateUrl: './saved-garages.component.html',
  styleUrl: './saved-garages.component.css'
})

export class SavedGaragesComponent {
  @Input() savedGarages: any[] = [];
  displayedColumns: string[] = [
    'shem_mosah',
    'yishuv',
    'telephone',
    'sug_mosah',
    'menahel_miktzoa',
    'ktovet',
    'miktzoa'
  ];
  

 
}
