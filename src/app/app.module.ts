import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';

import { MsalModule, MsalRedirectComponent, MsalGuard, MsalInterceptor } from '@azure/msal-angular';
import { PublicClientApplication, InteractionType } from '@azure/msal-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthserviceService } from '../app/shared/services/authservice.service';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule, 
    MsalModule.forRoot( new PublicClientApplication({
      auth: {
        clientId: '3f9f6f3b-fffc-40c9-be35-9c67f23e84cb',
        authority: 'https://login.microsoftonline.com/838dd0ab-c484-4619-ac32-807ef6da0240',
        redirectUri: 'http://localhost:4200/'
      },
      cache: {
        cacheLocation: 'localStorage',
        storeAuthStateInCookie: isIE
      }
    }), {
          interactionType: InteractionType.Redirect,
          authRequest: {
            scopes: ['user.read']
          }
    }, {
      interactionType: InteractionType.Redirect,
      protectedResourceMap: new Map([
        ['https://graph.microsoft.com/v1.0/me', ['user.read']]
      ])
    })
  ],
  providers: [
    AuthserviceService,
    MsalGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
