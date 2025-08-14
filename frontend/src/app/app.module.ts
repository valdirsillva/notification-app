import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module'; // <--- adiciona aqui

import { AppComponent } from './app.component';
import { NotificationFormComponent } from './components/notification-form/notification-form.component';
import { NotificationListComponent } from './components/notification-list/notification-list.component';
import { NotificationItemComponent } from './components/notification-item/notification-item.component';
import { ConnectionStatusComponent } from './components/connection-status/connection-status.component';

@NgModule({
  declarations: [
    AppComponent,
    NotificationFormComponent,
    NotificationListComponent,
    NotificationItemComponent,
    ConnectionStatusComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule, // <--- registra as rotas aqui
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
