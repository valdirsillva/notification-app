import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Defina as rotas do seu app
const routes: Routes = [
  // exemplo:
  // { path: '', component: NotificationListComponent },
  // { path: 'form', component: NotificationFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
