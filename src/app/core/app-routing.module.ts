import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalendarComponent } from '../components/calendar/calendar.component';
import { EventsComponent } from '../components/events/events.component';
import { PersonsComponent } from '../components/persons/persons.component';
import { MyprofileComponent } from '../components/myprofile/myprofile.component';
import { RelationsComponent } from '../components/relations/relations.component';
import { SectionsComponent } from '../components/sections/sections.component';
import { StudentSectionsComponent } from '../components/student-sections/student-sections.component';
import { UsersComponent } from '../components/users/users.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'calendar', component: CalendarComponent, canActivate: [ AuthGuard ] },
  { path: 'events', component: EventsComponent, canActivate: [ AuthGuard ] },
  { path: 'persons', component: PersonsComponent, canActivate: [ AuthGuard ] },
  { path: 'myprofile', component: MyprofileComponent, canActivate: [ AuthGuard ] },
  { path: 'relations', component: RelationsComponent, canActivate: [ AuthGuard ] },
  { path: 'sections', component: SectionsComponent, canActivate: [ AuthGuard ] },
  { path: 'student-sections', component: StudentSectionsComponent, canActivate: [ AuthGuard ] },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

