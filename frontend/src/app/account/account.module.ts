import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '../shared/material.module';

import { AccountDetailComponent } from './account-detail/account-detail.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountRoutingModule } from './account-routing.module';

@NgModule({
  declarations: [AccountListComponent, AccountDetailComponent],
  imports: [CommonModule, AccountRoutingModule, MaterialModule],
})
export class AccountModule {}
