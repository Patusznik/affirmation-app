import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

const firebaseConfig = {
  apiKey: 'AIzaSyB6eXelxmw8qoMdakyEVOaDASzJ1WNdOOc',
  authDomain: 'affirmation-app-aa954.firebaseapp.com',
  projectId: 'affirmation-app-aa954',
  storageBucket: 'affirmation-app-aa954.appspot.com',
  messagingSenderId: '364458238232',
  appId: '1:364458238232:web:40af6b826b855ab5813e6d',
  measurementId: 'G-FW9NVXX1C3'
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatPaginatorModule,
    MatChipsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule // storage
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
