import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from '../components/events/events.component';
import { PersonsComponent } from '../components/persons/persons.component';
import { RelationsComponent } from '../components/relations/relations.component';
import { SectionsComponent } from '../components/sections/sections.component';
import { StudentSectionsComponent } from '../components/student-sections/student-sections.component';
import { UsersComponent } from '../components/users/users.component';
import { UserTypesComponent } from '../components/user-types/user-types.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'profile', pathMatch: 'full' },
  { path: 'events', component: EventsComponent, canActivate: [ AuthGuard ] },
  { path: 'persons', component: PersonsComponent, canActivate: [ AuthGuard ] },
  { path: 'relations', component: RelationsComponent, canActivate: [ AuthGuard ] },
  { path: 'sections', component: SectionsComponent, canActivate: [ AuthGuard ] },
  { path: 'student-sections', component: StudentSectionsComponent, canActivate: [ AuthGuard ] },
  { path: 'users', component: UsersComponent, canActivate: [ AuthGuard ] },
  { path: 'user-types', component: UserTypesComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: UserProfileComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

