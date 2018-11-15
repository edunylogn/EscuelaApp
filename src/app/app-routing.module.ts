import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { PersonsComponent } from './components/persons/persons.component';
import { RelationsComponent } from './components/relations/relations.component';
import { SectionsComponent } from './components/sections/sections.component';
import { StudentSectionsComponent } from './components/student-sections/student-sections.component';
import { UsersComponent } from './components/users/users.component';
import { UserTypesComponent } from './components/user-types/user-types.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'persons', component: PersonsComponent },
  { path: 'relations', component: RelationsComponent },
  { path: 'sections', component: SectionsComponent },
  { path: 'student-sections', component: StudentSectionsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'user-types', component: UserTypesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

