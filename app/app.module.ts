import {NgModule} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

import {
    CreateEventComponent, CreateSessionComponent, DurationPipe, EventDetailsComponent, EventListResolverService,
    EventResolverService, EventService, EventsListComponent, EventThumbnailComponent, LocationValidator,
    SessionListComponent
} from './events/index'

import {NavBarComponent} from './nav/navbar.component'
import {RouterModule} from "@angular/router";
import {appRoutes} from "./routes";
import {Error404Component} from "./errors/404.component";
import {EventsAppComponent} from "./events-app.component";
import {AuthService} from "./user/auth.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CollapsibleWellComponent} from "./common/collapsible-well.component";
import {JQ_TOKEN, ModalTriggerDirective, SimpleModalComponent, TOASTER_TOKEN, Toastr} from "./common/index";
import {UpvoteComponent, VoteService} from "./events/event-details/index";
import {HttpModule} from "@angular/http";

declare let toastr: Toastr;
declare let jQuery: Object;
@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes),
        HttpModule
    ],
    declarations: [
        EventsAppComponent,
        EventsListComponent,
        EventDetailsComponent,
        EventThumbnailComponent,
        NavBarComponent,
        CreateEventComponent,
        Error404Component,
        CreateSessionComponent,
        SessionListComponent,
        CollapsibleWellComponent,
        DurationPipe,
        SimpleModalComponent,
        UpvoteComponent,
        LocationValidator,
        ModalTriggerDirective
    ],
    providers: [
        EventService,
        EventResolverService,
        EventListResolverService,
        VoteService,
        AuthService,
        {provide: TOASTER_TOKEN, useValue: toastr},
        {provide: JQ_TOKEN, useValue: jQuery},
        {provide: 'canDeactivateCreateEvent', useValue: checkDirtyState}
    ],
    bootstrap: [EventsAppComponent]
})
export class AppModule {
}

function checkDirtyState(component: CreateEventComponent) {
    if (!component.isDirty)
        return window.confirm('You have not saved this event, do you really want to cancel?');
    return false
}