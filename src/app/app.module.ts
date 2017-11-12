import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { ChatService } from './chat.service';
import { ChatComponent } from './components/chat/chat.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import {ValidateService} from './services/validate.service';
import {AuthService} from './services/auth.service';

import {FlashMessagesModule} from 'angular2-flash-messages';

const ROUTES = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'chats', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),
    FlashMessagesModule
    
  ],
  providers: [
    ChatService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    ValidateService,
    AuthService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
