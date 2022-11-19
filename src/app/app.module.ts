import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {TestComponent} from './test/test.component'
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import { ModalComponent } from './modal/modal.component';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    MdbModalModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
