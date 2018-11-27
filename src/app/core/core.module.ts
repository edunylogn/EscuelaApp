import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
import { Permissions } from './permissions';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [AuthService, AuthGuard, Permissions, NotifyService]
})
export class CoreModule { }