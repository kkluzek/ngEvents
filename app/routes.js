"use strict";
var index_1 = require("./events/index");
var _404_component_1 = require("./errors/404.component");
exports.appRoutes = [
    { path: 'events', component: index_1.EventsListComponent, resolve: { events: index_1.EventListResolverService } },
    { path: 'events/session/new', component: index_1.CreateSessionComponent },
    { path: 'events/new', component: index_1.CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
    { path: 'events/:id', component: index_1.EventDetailsComponent, resolve: { event: index_1.EventResolverService } },
    { path: '404', component: _404_component_1.Error404Component },
    { path: '', redirectTo: 'events', pathMatch: 'full' },
    { path: 'user', loadChildren: 'app/user/user.module#UserModule' }
];
//# sourceMappingURL=routes.js.map