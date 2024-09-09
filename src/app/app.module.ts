import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';  // <-- Add this import

import { metaReducers, reducers } from './store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { environment } from '../environments/environment';  // <-- To check if it's dev mode

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateSerializability: true,
        strictActionSerializability: true,
        strictActionWithinNgZone: true,
        strictActionTypeUniqueness: true,
      },
      metaReducers: metaReducers,
    }),
    // Only enable dev tools in development mode
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      // logOnly: environment.production, // Restrict extension to log-only mode in production
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
