import { UserService } from './services/user/user.service';
import { HomeComponent } from './components/home/home.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {
  MatToolbarModule,
  MatCardModule,
  MatListModule,
  MatGridListModule,
  MatButtonModule,
  MatInputModule,
  MatSlideToggleModule,
  MatAutocompleteModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatIconModule,
  MatMenuModule,
  MatStepperModule,
} from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/user/login/login.component';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { AddDishesComponent } from './components/create-menu/add-dishes/add-dishes.component';
import { AutofocusDirective } from './directives/autofocus/autofocus.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ToolbarComponent,
    HomeComponent,
    CreateMenuComponent,
    AddDishesComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MatToolbarModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    MatSlideToggleModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    MatStepperModule,
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }