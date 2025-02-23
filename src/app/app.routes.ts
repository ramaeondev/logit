import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent)
    },
    {   path: 'registration',
        loadComponent: () => import('./registration/registration.component').then(m => m.RegistrationComponent)
    },
    {   path: 'dashboard',
        loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },

];
