import { NgModule } from '@angular/core';
import { AuthGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';
import { NotifyService } from '../services/notify.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { CustomMaterialModule } from './material.module';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule,
    CustomMaterialModule
  ],
  providers: [AuthService, AuthGuard, NotifyService]
})
export class CoreModule { }