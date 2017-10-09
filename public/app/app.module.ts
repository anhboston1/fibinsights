import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }  from './app.component';
import { appRouting } from './app.routing';
import { CoreModule }   from './core/core.module';
//import { AuthModule }   from './auth/auth.module';
import { SharedModule }   from './shared/shared.module';

@NgModule({
  imports: [
    BrowserModule, 
    appRouting.routes, 
    CoreModule,   //Singleton objects
    //AuthModule,
    SharedModule  //Shared (multi-instance) objects
  ],
  declarations: [ AppComponent, appRouting.components ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }