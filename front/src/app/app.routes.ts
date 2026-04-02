import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Maintenance } from './pages/maintenance/maintenance';
import { maintenanceGuard } from './guard/maintenance-guard';
import { maintenanceDisabledGuard } from './guard/maintenance-disabled-guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [maintenanceGuard] },
  { path: 'about', component: AboutComponent, canActivate: [maintenanceGuard] },
  { path: 'portfolio', component: PortfolioComponent, canActivate: [maintenanceGuard] },
  { path: 'contact', component: ContactComponent, canActivate: [maintenanceGuard] },
  { path: 'maintenance', component: Maintenance, canActivate: [maintenanceDisabledGuard] },
  { path: '**', redirectTo: '' },
];
