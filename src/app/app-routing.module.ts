import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './components/events/events.component';
import { PersonsComponent } from './components/persons/persons.component';

const routes: Routes = [
  { path: '', redirectTo: 'events', pathMatch: 'full' },
  { path: 'events', component: EventsComponent },
  { path: 'persons', component: PersonsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

