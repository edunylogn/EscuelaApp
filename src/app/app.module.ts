import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { CustomReuseStrategy } from './core/reuse-strategy';
import { AppRoutingModule } from './core/app-routing.module';
import { environment } from '../environments/environment';
import { EventService } from './services/event.service';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventsComponent } from './components/events/events.component';
import { EventAddComponent } from './components/event-add/event-add.component';
import { PersonService } from './services/person.service';
import { PersonsComponent } from './components/persons/persons.component';
import { RelationsComponent } from './components/relations/relations.component';
import { RelationService } from './services/relationship.service';
import { SectionsComponent } from './components/sections/sections.component';
import { SectionService } from './services/section.service';
import { StudentSectionsComponent } from './components/student-sections/student-sections.component';
import { StudentSectionService } from './services/studentSection.service';
import { UsersComponent } from './components/users/users.component';
import { UserService } from './services/user.service';
import { UserTypesComponent } from './components/user-types/user-types.component';
import { UserTypeService } from './services/userType.service';
import { PersonAddComponent } from './components/person-add/person-add.component';
import { RelationAddComponent } from './components/relation-add/relation-add.component';
import { SectionAddComponent } from './components/section-add/section-add.component';
import { StudentSectionAddComponent } from './components/student-section-add/student-section-add.component';
import { UserTypeAddComponent } from './components/user-type-add/user-type-add.component';
import { UserAddComponent } from './components/user-add/user-add.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { NotificationMessageComponent } from './components/notification-message/notification-message.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EventsComponent,
    PersonsComponent,
    RelationsComponent,
    SectionsComponent,
    StudentSectionsComponent,
    UsersComponent,
    UserTypesComponent,
    EventAddComponent,
    PersonAddComponent,
    RelationAddComponent,
    SectionAddComponent,
    StudentSectionAddComponent,
    UserTypeAddComponent,
    UserAddComponent,
    NotificationMessageComponent,
    UserProfileComponent,
    UserFormComponent,
    NotFoundComponent,
    MainNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'EscuelaTCU'),
    AngularFirestoreModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    EventService,
    PersonService,
    RelationService,
    SectionService,
    StudentSectionService,
    UserService,
    UserTypeService,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
