import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent],
  imports: [CommonModule, AccountRoutingModule, MaterialModule]
})
export class AccountModule { }
