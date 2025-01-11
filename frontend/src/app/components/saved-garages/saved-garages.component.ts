import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';import { MatTableDataSource } from '@angular/material/table';
import { GarageService } from '../../services/garage.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-saved-garages',
  imports: [ CommonModule, 
    MatTableModule, // Table module for mat-table
    MatButtonModule, // For mat-icon-button
    MatIconModule,],
  templateUrl: './saved-garages.component.html',
  styleUrl: './saved-garages.component.css'
})

export class SavedGaragesComponent implements OnChanges{
  @Input() savedGarages: any[] = [];
  displayedColumns: string[] = ['shem_mosah', 'yishuv', 'telephone', 'expand'];
  expandedElement: any | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['savedGarages']) {
    }
  } 
  
  toggleRow(garage: any): void {
    this.expandedElement = this.expandedElement === garage ? null : garage;
    console.log('Toggled row:', this.expandedElement);
  }
}
