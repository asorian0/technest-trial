import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NG_ENTITY_SERVICE_CONFIG } from '@datorama/akita-ng-entity-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BitcoinModule } from './bitcoin/bitcoin.module';
import { MaterialModule } from './shared/material.module';
import { PageToolbarComponent } from './shared/page-toolbar/page-toolbar.component';

@NgModule({
  declarations: [AppComponent, PageToolbarComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    BitcoinModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: NG_ENTITY_SERVICE_CONFIG,
      useValue: { baseUrl: 'https://jsonplaceholder.typicode.com' },
    },
  ],
})
export class AppModule {}
