import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../../shared/shared.module';
import { SignUpRoutingModule } from './signup-routing.module';

@NgModule({
  imports: [ ReactiveFormsModule, SharedModule, SignUpRoutingModule ],
  declarations: [ SignUpRoutingModule.components ]
})
export class LoginModule { }