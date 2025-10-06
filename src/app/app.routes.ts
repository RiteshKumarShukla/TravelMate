import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { TourLeadersComponent } from './pages/tour-leaders/tour-leaders.component';
import { ToursComponent } from './pages/tours/tours.component';   // 👈 Import new component

export const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [LoginGuard] },

  {
    path: 'dashboard',
    component: MainLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'leaders',
    component: MainLayoutComponent,
    children: [
      { path: '', component: TourLeadersComponent, canActivate: [AuthGuard] },
    ],
  },
  {
    path: 'tours',
    component: MainLayoutComponent,
    children: [
      { path: '', component: ToursComponent, canActivate: [AuthGuard] }, // 👈 New route
    ],
  },
  { path: '**', redirectTo: '' },
];
