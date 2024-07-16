import { NgModule } from '@angular/core';

import {RouterModule, Routes } from '@angular/router';

export const routes: Routes =[
    {
        path: '',
        redirectTo: 'table',
        pathMatch: 'full',
    },
    {
        path: 'table',
        loadComponent: () =>
          import('./components/customer-table/customer-table.component').then((m) => m.CustomerTableComponent),
        title: 'Table',
    },
    {
        path: 'graph/:id',
        loadComponent: () =>
          import('./components/customer-graph/customer-graph.component').then((m) => m.CustomerGraphComponent),
        title: 'Graph',
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
  })
  export class AppRoutingModule {}
