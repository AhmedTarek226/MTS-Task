import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { HeaderComponent } from './Components/header/header.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SingleDisputeComponent } from './Components/single-dispute/single-dispute.component';
import { CreateDisputeComponent } from './Components/create-dispute/create-dispute.component';
import { LoaderComponent } from './Components/loader/loader.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderInterceptor } from './Interceptors/loader.interceptor';
import { DisputeDetailsGuard } from './Gaurds/dispute-details.guard';
import { AuditComponent } from './Components/audit/audit.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { JwtInterceptor } from './Interceptors/jwt.interceptor';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MainLayoutComponent,
    SingleDisputeComponent,
    CreateDisputeComponent,
    LoaderComponent,
    AuditComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatProgressSpinnerModule,
    ButtonModule,
    TableModule,
    PaginatorModule,
    MultiSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    DisputeDetailsGuard,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
