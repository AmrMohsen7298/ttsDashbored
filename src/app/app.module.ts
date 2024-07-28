import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { 

  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  HeaderModule,
  SidebarModule,
  GridModule ,
  NavbarModule,
  NavModule,
  PaginationModule,
  ModalModule,TabPanelComponent,TabsModule,TabsComponent,TabContentComponent,TabsListComponent,
  Tabs2Module

} from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule, IconSetService } from '@coreui/icons-angular';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

import { AddLessonComponent } from './add-lesson/add-lesson.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { AlertComponent, AlertHeadingDirective } from '@coreui/angular';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
AddLessonComponent,
LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AlertComponent,
    AlertHeadingDirective,
    ReactiveFormsModule,
    AppRoutingModule,
    ButtonModule,
    TabPanelComponent,
    Tabs2Module,
    TabContentComponent,
    TabsListComponent,
    TabsModule,
    TabsComponent,
    NavbarModule,
    GridModule,
    CardModule,
    NavModule,
    FooterModule,
PaginationModule,
    HeaderModule,
    ModalModule ,
    IconModule,
     
    SidebarModule,
   
DropdownModule,
    IconModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
