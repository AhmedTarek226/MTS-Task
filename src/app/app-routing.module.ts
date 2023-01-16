import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuditComponent } from './Components/audit/audit.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { SingleDisputeComponent } from './Components/single-dispute/single-dispute.component';
import { DisputeDetailsGuard } from './Gaurds/dispute-details.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: '/Home', pathMatch: 'full' },
      { path: 'Home', component: HomeComponent },
      {
        path: 'Dispute/:id',
        component: SingleDisputeComponent,
        // canActivate: [DisputeDetailsGuard],
      },
      { path: 'Audit', component: AuditComponent },
    ],
  },
  { path: 'Login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
