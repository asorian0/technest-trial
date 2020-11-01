import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CurrencyBitcoinPipe } from './currency-bitcoin.pipe';

const modules = [
  MatTableModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatSortModule,
  MatPaginatorModule,
  MatCardModule,
  MatSnackBarModule,
];

@NgModule({
  declarations: [CurrencyBitcoinPipe],
  imports: [CommonModule, ...modules],
  exports: [modules, CurrencyBitcoinPipe],
})
export class MaterialModule {}
