import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DownlineListComponent } from './downline-list/downline-list.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: '/analysis',
        pathMatch: 'full',
      },
      {
        path: 'analysis',
        loadChildren: () =>
          import('./analysis/analysis.module').then((m) => m.AnalysisModule),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'downline',
        component: DownlineListComponent,
      },
      {
        path: 'memberList',
        loadChildren: () =>
          import('./member-list/member-list.module').then(
            (m) => m.MemberListModule
          ),
      },
      {
        path: 'my-account',
        loadChildren: () =>
          import('./my-account/my-account.module').then(
            (m) => m.MyAccountModule
          ),
      },
      {
        path: 'reports',
        loadChildren: () =>
          import('./reports/reports.module').then((m) => m.ReportsModule),
      },
      {
        path: 'bet-list',
        loadChildren: () =>
          import('./betlist/betlist.module').then((m) => m.BetlistModule),
      },
      {
        path: 'risk-management',
        loadChildren: () =>
          import('./risk-management/risk-management.module').then(
            (m) => m.RiskManagementModule
          ),
      },
      {
        path: 'banking',
        loadChildren: () =>
          import('./banking/banking.module').then((m) => m.BankingModule),
      },
      {
        path: 'events',
        loadChildren: () =>
          import('./events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'teenpatti',
        loadChildren: () =>
          import('./teenpatti/teenpatti.module').then((m) => m.TeenpattiModule),
      },
      {
        path: 'manual',
        loadChildren: () =>
          import('./manual/manual.module').then((m) => m.ManualModule),
      },
      {
        path: 'messages',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
