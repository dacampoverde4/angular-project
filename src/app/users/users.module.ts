import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { BreadcrumbModule } from 'angular-crumbs';
import { ModalModule } from '../modal/modal.module';
import { TableModule } from '../table/table.module';
import { ChildrenComponent } from './children/children.component';
import { UserComponent } from './user/user.component';
import { SubComponent } from './users-list/sub/sub.component';
import { UsersListComponent } from './users-list/users-list.component';

const clientRoutes: Routes = [
  {
    path: ':selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
    ],
  },
];

const agentRoutes: Routes = [
  {
    path: 'sub/:selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
      ...clientRoutes,
    ],
  },
];

const masterRoutes: Routes = [
  {
    path: 'sub/:selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
      ...agentRoutes,
    ],
  },
];

const superMasterRoutes: Routes = [
  {
    path: 'sub/:selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
      ...masterRoutes,
    ],
  },
];

const subAdminRoutes: Routes = [
  {
    path: 'sub/:selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
      ...superMasterRoutes,
    ],
  },
];

const adminRoutes: Routes = [
  {
    path: 'sub/:selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
      ...subAdminRoutes,
    ],
  },
];

const whitelabelRoutes: Routes = [
  {
    path: 'sub/:selectedUid',
    component: ChildrenComponent,
    resolve: {
      breadcrumb: 'breadcrumb',
    },
    children: [
      {
        path: '',
        component: SubComponent,
      },
      ...adminRoutes,
    ],
  },
];

const routes: Routes = [
  {
    path: '',
    component: UsersListComponent,
    children: [
      {
        path: ':userType',
        component: ChildrenComponent,
        resolve: {
          breadcrumb: 'breadcrumb',
        },
        children: [
          {
            path: '',
            component: SubComponent,
          },
          ...whitelabelRoutes,
        ],
      },
    ],
  },
];

@NgModule({
  declarations: [
    UsersListComponent,
    UserComponent,
    SubComponent,
    ChildrenComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    TableModule
  ],
  providers: [
    {
      provide: 'breadcrumb',
      useValue: (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
        // route.data
        return history.state.data;
      },
    },
  ],
})
export class UsersModule {}
