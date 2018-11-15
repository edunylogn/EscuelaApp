import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { FormsModule } from '@angular/forms';
import { EventService } from './services/event.service';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './reuse-strategy';

import { AppRoutingModule } from './app-routing.module';
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
    UserAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase, 'EscuelaTCU'),
    AngularFirestoreModule,
    FormsModule
  ],
  providers: [
    EventService,
    PersonService,
    RelationService,
    SectionService,
    StudentSectionService,
    UserService,
    UserTypeService,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
