import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PostsComponent } from './components/posts/posts.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';

import { environment } from '../environments/environment';

// https://www.npmjs.com/package/@angular/fire
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HeaderComponent } from './components/header/header.component';
import { NewpostComponent } from './components/newpost/newpost.component';
import {
    DevToolsExtension,
    NgRedux,
    NgReduxModule
} from '@angular-redux/store';
import { AppState, rootReducer } from './store/Store';
import { NgReduxRouter, NgReduxRouterModule } from '@angular-redux/router';
import { EditpostComponent } from './components/editpost/editpost.component';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { NeweventComponent } from './components/newevent/newevent.component';
import { DatePipe } from '@angular/common';
import { EditeventComponent } from './components/editevent/editevent.component';
import { EventsComponent } from './components/events/events.component';
import { TableFilterPipe } from './pipes/table-filter.pipe';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChatsComponent } from './components/chats/chats.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { NewcollectionComponent } from './components/newcollection/newcollection.component';
import { CollectionsComponent } from './components/collections/collections.component';
import { EditcollectionComponent } from './components/editcollection/editcollection.component';

@NgModule({
    declarations: [
        AppComponent,
        PostsComponent,
        SidenavComponent,
        HeaderComponent,
        NewpostComponent,
        EditpostComponent,
        NeweventComponent,
        EditeventComponent,
        EventsComponent,
        TableFilterPipe,
        DashboardComponent,
        ProfileComponent,
        ChatsComponent,
        VolunteersComponent,
        CollectionsComponent,
        NewcollectionComponent,
        EditcollectionComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        BrowserAnimationsModule,
        MatListModule,
        MatIconModule,
        MatSidenavModule,
        MatButtonModule,
        MatToolbarModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatButtonToggleModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatGridListModule,
        ReactiveFormsModule,
        FormsModule,
        MatTableModule,
        HttpClientModule,
        NgReduxModule,
        NgReduxRouterModule.forRoot(),
        ToastrModule.forRoot(),
        NgxMatTimepickerModule
    ],
    providers: [DatePipe],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(
        private ngRedux: NgRedux<AppState>,
        private devTool: DevToolsExtension
    ) {
        this.ngRedux.configureStore(
            rootReducer,
            {},
            [],
            [devTool.isEnabled() ? devTool.enhancer() : (f) => f]
        );
    }
}
